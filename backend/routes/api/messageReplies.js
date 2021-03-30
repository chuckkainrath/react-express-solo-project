const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser, userInGroup } = require('../../utils/auth');
const { MessageReply } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReply = [
  check('reply')
    .exists({ checkFalsy: true })
    .withMessage('Reply cannot be empty.'),
  handleValidationErrors
];

router.post('/', restoreUser, validateReply, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { messageBoardId, reply } = req.body;

  // if (!(await userInGroup(userId, groupId))) {
  //   return res.status(403).end();
  // }

  const reply = await MessageReply.create({ userId, messageBoardId, reply });
  res.json({ reply });
}));

router.get('/:messageBoardId(\\d+)', restoreUser, asyncHandler(async (req, res) => {
  const { messageBoardId } = req.params;
  //const { userId } = req.user.id;

  // // Make sure User is part of Group
  // if (!(await userInGroup(userId, groupId))) {
  //   return res.status(403).end();
  // }

  // Get all messages and replies
  const replies = await MessageReply.findAll({ where: { messageBoardId }});
  res.json({ message });
}));

router.put('/:replyId', restoreUser, validateReply, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { replyId } = req.params;
  const { reply } = req.body;

  let updatedReply = await MessageReply.findByPk(replyId);
  // Check if reply exists and it belongs to the user.
  if (!updatedReply) {
    return res.status(404).end();
  } else if (updatedReply.userId !== userId) {
    return res.status(403).end();
  }

  updatedReply = await updatedReply.update({ reply });
  res.json({ reply: updatedReply });
}));

router.delete('/:replyId', restoreUser, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { replyId } = req.params;

  const reply = await MessageReply.findByPk(replyId);
  if (!reply) {
    return res.status(404).end();
  } else if (reply.userId !== userId) {
    return res.status(403).end();
  }

  await reply.destroy();
  res.json();
}));

module.exports = router;
