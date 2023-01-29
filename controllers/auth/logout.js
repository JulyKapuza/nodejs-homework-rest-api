const createError = require("http-errors");

const { User } = require("../../models");

/* -------------------------------------------------------------------------- */
/*                           @ POST / api / users /logout                      */
/* -------------------------------------------------------------------------- */
const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });
  if (!user) {
    throw createError(401, "Not authorized");
  }
  res.status(204).json();
};

module.exports = logout;
