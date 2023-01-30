const createError = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

/* -------------------------------------------------------------------------- */
/*                          @ POST / api / users /register                    */
/* -------------------------------------------------------------------------- */

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, subscription, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
