const register = require('./register');
const login = require('./login');
const currentUser = require('./currentUser');
const logout = require('./logout');
const updateSubscription = require('./undateSubscription');
const updateAvatar = require('./updateAvatar')


module.exports = {
  register,
  login,
  currentUser,
  logout,
  updateSubscription,
  updateAvatar,
};