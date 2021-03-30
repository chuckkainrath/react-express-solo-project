const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser, userInGroup } = require('../../utils/auth');
const { Invitation, User, UserGroup, Group } = require('../../db/models');
const { route } = require('./groups');

router.post('/', restoreUser, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { email, username, groupId } = req.body;

  // Check if user is owner of group
  const group = await Group.findByPk(groupId);
  if (!group) {
    return res.status(404).end();
  } else if (group.ownerId !== userId) {
    return res.status(403).end();
  }

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
    return res.status(404).end();
  }

  // Check if user is already in group.
  const invitedUserGroup = await UserGroup.findOne( {where: { userId: invitedUser, groupId }});
  if (invitedUserGroup) {
    return res.status(400).end(); // Correct status code?
  }

  await Invitation.create({userId: invitedUser, groupId});
  res.json();
}));

router.delete('/:inviteId', restoreUser, asyncHandler(async (req, res) => {
  const { inviteId } = req.params;
  const userId = req.user.id;
  const { acceptInvite } = req.body;

  const invite = await Invitation.findByPk(inviteId);

  if (!invite) {
    return res.status(404).end();
  } else if (invite.userId !== userId) {
    return res.status(403).end();
  }

  let group;
  if (acceptInvite) {
    group = await UserGroup.create({ userId, groupId: invite.groupId });
    if (group) {
      await invite.destroy();
    } else {
      return res.status(500).end(); // Correct status code?
    }
  } else {
    await invite.destroy();
  }

  res.json(); // Return something here?
}));

module.exports = router;
