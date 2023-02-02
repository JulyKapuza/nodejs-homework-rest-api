const register = require('./register');
const login = require('./login');
const currentUser = require('./currentUser');
const logout = require('./logout');
const updateSubscription = require('./undateSubscription');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail =require('./resendVerifyEmail')


module.exports = {
  register,
  login,
  currentUser,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};