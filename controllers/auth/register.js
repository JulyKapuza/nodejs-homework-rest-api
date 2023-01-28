const { User } = require("../../models");
const createError = require("http-errors");

/* -------------------------------------------------------------------------- */
/*                          @ POST / api / users /register                    */
/* -------------------------------------------------------------------------- */

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = register;
