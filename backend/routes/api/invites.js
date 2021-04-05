const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser, userInGroup } = require('../../utils/auth');
const {
  Invitation,
  User,
  UserGroup,
  Group,
  Schedule,
  MessageBoard,
  MessageReply,
  TodoGroup,
  TodoItem
 } = require('../../db/models');
const { route } = require('./groups');

router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let invites = await Invitation.findAll({
    where: {userId},
    attributes: ['userId', 'groupId', 'id'],
    include: [{model: Group, attributes: ['name']}]
  });
  res.json({invites});
}));

router.post('/', restoreUser, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { email, username, groupId } = req.body;

  // Check if group exists
  const group = await Group.findByPk(groupId);
  if (!group) {
    return res.status(404).end();
  }
  // else if (group.ownerId !== userId) {  // Checking if user is group owner.
  //   return res.status(403).end();
  // }

  if (!email && !username) {
    return res.status(400).end();
  }
  let invitedUser;
  if (email && username) {
    invitedUser = await User.findOne({ where: { email, username }});
  } else if (email) {
    invitedUser = await User.findOne({ where: { email }});
  } else {
    invitedUser = await User.findOne({ where: { username }});
  }
  if (!invitedUser) {
    return res.json({result: 'User Not Found'});
  }

  // Check if user is already in group.
  const invitedUserGroup = await UserGroup.findOne( {where: { userId: invitedUser.id, groupId }});
  if (invitedUserGroup) {
    return res.json({result: 'User In Group'});
  }

  await Invitation.create({userId: invitedUser.id, groupId});
  res.json({result: 'Invite Sent'});
}));

router.delete('/:inviteId', restoreUser, asyncHandler(async (req, res) => {
  const { inviteId } = req.params;
  const userId = req.user.id;
  const { acceptInvite } = req.body;

  const invite = await Invitation.findOne({
    where: { id: inviteId }
  });
  console.log('invite ', invite);
  console.log('inviteId ', inviteId);
  if (!invite) {
    return res.status(404).end();
  } else if (invite.userId !== userId) {
    return res.status(403).end();
  }

  let group, groupData;
  if (acceptInvite) {
    group = await UserGroup.create({ userId, groupId: invite.groupId });

    groupData = await Group.findOne({
      where: { id: invite.groupId },
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
    if (group) {
      await invite.destroy();
    } else {
      return res.status(500).end();
    }
  } else {
    await invite.destroy();
  }

  res.json({groupData});
}));

module.exports = router;
