const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser, userInGroup } = require('../../utils/auth');
const { TodoGroup } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateTodoGroup = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title cannot be empty.'),
  handleValidationErrors
];

router.post('/', restoreUser, validateTodoGroup, asyncHandler(async (req, res) => {
  const { title, groupId } = req.body;
  const userId = req.user.id;

  // Check if user is in group.
  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  const todoGroup = await TodoGroup.create({ title, groupId });
  res.json({todoGroup});
}));

router.get('/:groupId(\\d+)', restoreUser, asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user.id;

  // Check if user is in group.
  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  const todoGroups = await TodoGroup.findAll({
    where: { groupId }, include: [{ model: TodoItem }]
  });

  res.json({todoGroups});
}));

router.put('/:todoGroupId(\\d+)', restoreUser, validateTodoGroup, asyncHandler(async (req, res) => {
  const { todoGroupId } = req.params;
  const { title, completed } = req.body;
  const userId = req.user.id;

  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  let todoGroup = await TodoGroup.findByPk(todoGroupId);
  if (!todoGroupId) {
    return res.status(404).end();
  }

  todoGroup = await todoGroup.update({ title, completed })

  res.json({todoGroup});
}));

router.delete('/:todoGroupId(\\d+)', restoreUser, asyncHandler(async (req, res) => {
  const { todoGroupId } = req.params;
  const userId = req.user.id;

  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  let todoGroup = await TodoGroup.findByPk(todoGroupId);
  if (!todoGroupId) {
    return res.status(404).end();
  }

  await todoGroup.destroy();

  res.json();
}));

module.exports = router;
