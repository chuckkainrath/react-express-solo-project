const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// For Testing Auth Middlewares
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-User'
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

module.exports = router;
