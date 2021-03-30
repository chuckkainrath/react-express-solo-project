const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser, userInGroup } = require('../../utils/auth');
const { Schedule } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// TODO: Check date is after current time.
const validateSchedule = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title cannot be empty.'),
  check('date')
    .exists({ checkFalsy: true })
    .withMessage('Title cannot be empty.'),
  handleValidationErrors
];

router.post('/', restoreUser, validateSchedule, asyncHandler(async (req, res) => {
  const { title, groupId, date } = req.body;
  const userId = req.body.user;

  // Check if user is in group.
  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  const schedule = await Schedule.create({ title, groupId, date });
  res.json({schedule});
}));

router.get('/:groupId(\\d+)', restoreUser, asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user.id;

  // Check if user is in group.
  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  const schedules = await Schedule.findAll({
    where: { groupId }
  });

  res.json({schedules});
}));

router.put('/:scheduleId', restoreUser, validateSchedule, asyncHandler(async (res, res) => {
  const { scheduleId } = req.params;
  const userId = req.user.id;
  const { title, date } = req.body;

  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  let schedule = await Schedule.findByPk(scheduleId);
  if (!schedule) {
    return res.status(404).end();
  }

  schedule = await schedule.update({ title, date });
  res.json({ schedule });
}))

router.delete('/:scheduleId', restoreUser, asyncHandler(async (req, res) => {
  const { scheduleId } = req.params;
  const userId = req.user.id;

  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  const schedule = await Schedule.findByPk(scheduleId);
  if (!schedule) {
    return res.status(404).end();
  }

  await schedule.destroy();

  res.json();
}))

module.exports = router;
