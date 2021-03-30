const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser, userInGroup } = require('../../utils/auth');
const { TodoItem } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateTodoItem = [
  check('task')
    .exists({ checkFalsy: true })
    .withMessage('Task cannot be empty.'),
  handleValidationErrors
];

router.post('/', restoreUser, validateTodoItem, asyncHandler(async (req, res) => {
  const { task, taskGroupId, groupId } = req.body;
  const userId = req.user.id;

  // Check if user is in group.
  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  const todoItem = await TodoItem.create({ task, todoGroupId });
  res.json({todoGroup});
}));

router.get('/:todoGroupId(\\d+)', restoreUser, asyncHandler(async (req, res) => {
  const { todoGroupId } = req.params;
  // const userId = req.user.id;

  // // Check if user is in group.
  // if (!(await userInGroup(userId, groupId))) {
  //   return res.status(403).end();
  // }

  const todoItems = await TodoItem.findAll({ where: { todoGroupId }});

  res.json({todoItems});
}));

router.put('/:todoItemId(\\d+)', restoreUser, validateTodoItem, asyncHandler(async (req, res) => {
  const { todoItemId } = req.params;
  const { task, completed } = req.body;
  // const userId = req.user.id;

  // if (!(await userInGroup(userId, groupId))) {
  //   return res.status(403).end();
  // }

  let todoItem = await TodoItem.findByPk(todoItemId);
  if (!todoItem) {
    return res.status(404).end();
  }

  todoItem = await todoItem.update({ task, completed })

  res.json({todoItem});
}));

router.delete('/:todoItemId(\\d+)', restoreUser, asyncHandler(async (req, res) => {
  const { todoItemId } = req.params;
  // const userId = req.user.id;

  // if (!(await userInGroup(userId, groupId))) {
  //   return res.status(403).end();
  // }

  let todoItem = await TodoItem.findByPk(todoItemId);
  if (!todoItem) {
    return res.status(404).end();
  }

  await todoItem.destroy();

  res.json();
}));

module.exports = router;
