const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateGroup = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name for your group.')
    .isLength({ max: 50 })
    .withMessage('Group name must not be longer than 50 characters'),
  handleValidationErrors,
];

router.post('/', restoreUser, validateGroup, asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { user } = req;
  // TODO: error handling
  const group = await Group.create({
    ownerId,
    name
  });
  return res.json({ group })
}));

router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const { user } = req;
  // const groups = await Group.findAll({
  //   include: [{
  //     model: UserGroup
  //   }]
  // })
}));

module.exports = router;
