const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const groupRouter = require('./groups');
const messageBoardRouter = require('./messageBoard');
const todoGroupRouter = require('./todoGroup');
const scheduleRouter = require('./schedule');
const todoItemRouter = require('./todoItem');
const messageReplyRouter = require('./messageReplies');
const invitationRouter = require('./invites.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/groups', groupRouter);
router.use('/message-boards', messageBoardRouter);
router.use('/todo-groups', todoGroupRouter);
router.use('/schedules', scheduleRouter);
router.use('/todo-items', todoItemRouter);
router.use('/message-replies', messageReplyRouter);
router.use('/invites', invitationRouter);

module.exports = router;
