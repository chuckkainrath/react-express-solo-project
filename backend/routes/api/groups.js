const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const {
  Group,
  UserGroup,
  User,
  Schedule,
  MessageBoard,
  MessageReply,
  TodoGroup,
  TodoItem
} = require('../../db/models');
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
  // Create Group
  const group = await Group.create({
    ownerId: user.id,
    name
  });

  // Update UserGroup
  await UserGroup.create({userId: user.id, groupId: group.id});
  return res.json({ group })
}));

// Get all group data associate with user
router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userGroups = await UserGroup.findAll({where: { userId }, attributes: ['groupId']});
  if (!userGroups) {
    return res.json();
  }
  const groupIds = userGroups.map(group => {
    return group.dataValues.groupId;
  });

  const allGroupData = await Group.findAll({
    where: { id: groupIds },
    include: [{model: Schedule},
      {model: TodoGroup, include: [{ model: TodoItem }]},
      {model: MessageBoard, include: [{model: User, attributes: ['username']},
        {model: MessageReply, include: [{model: User, attributes: ['username']}]}]}],
    order: [
      ['createdAt', 'ASC'],
      [TodoGroup, 'createdAt', 'ASC'],
      [TodoGroup, TodoItem, 'createdAt', 'ASC'],
      [MessageBoard, 'createdAt', 'DESC'],
      [MessageBoard, MessageReply, 'createdAt', 'ASC'],
    ]
   });
  res.json({ allGroupData });
}));

module.exports = router;
