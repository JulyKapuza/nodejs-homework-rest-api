const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { User } = require("../../models");
const { SECRET_KEY } = process.env;

/* -------------------------------------------------------------------------- */
/*                           @ GET / api / users /login                       */
/* -------------------------------------------------------------------------- */

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verify || !user.comparePassword(password)) {
    throw createError(
      401,
      "Email is wrong or not verify, or password is wrong"
    );
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
