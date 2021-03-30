const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser, userInGroup } = require('../../utils/auth');
const { MessageBoard } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateMessage = [
  check('message')
    .exists({ checkFalsy: true })
    .withMessage('Message cannot be empty.'),
  handleValidationErrors
];

router.post('/', restoreUser, validateMessage, asyncHandler(async (req, res) => {
  const { user } = req;
  const { groupId, message } = req.body;

  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }
  const message = await MessageBoard.create({ userId: user.id, groupId, message });
  res.json({message});
}));

router.get('/:groupId(\\d+)', restoreUser, asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.user.id;

  // Make sure User is part of Group
  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  // Get all messages and replies
  const messages = await MessageBoard.findAll({ where: { groupId }, include: [{ model: MessageReply }]});
  res.json({ messages });
}));

router.put('/:messageBoardId', restoreUser, validateMessage, asyncHandler(async (req, res) => {
  const { messageBoardId } = req.params;
  const userId = req.user.id;
  const { message } = req.body;

  let newMessage = await MessageBoard.findByPk(messageBoardId);
  if (!newMessage) {
    return res.status(404).end();
  } else if (newMessage.userId !== userId) {
    return res.status(403).end();
  }

  newMessage = await newMessage.update({ message });
  res.json({ message: newMessage });
}));

router.delete('/:messageBoardId', restoreUser, asyncHandler(async (req, res) => {
  const { messageBoardId } = req.params;
  const userId = req.user.id;
  const { groupId } = req.body;

  if (!(await userInGroup(userId, groupId))) {
    return res.status(403).end();
  }

  const message = await MessageBoard.findByPk(messageBoardId);
  if (!message) {
    return res.status(404).end();
  } else if (message.userId !== userId){
    return res.status(403).end();
  }

  await message.destroy();
  res.json();
}));

module.exports = router;
