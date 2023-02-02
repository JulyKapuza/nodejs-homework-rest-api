const createError = require("http-errors");
const gravatar = require("gravatar");
const {uid} = require('uid')
const { User } = require("../../models");


const { sendEmail } = require("../../services");

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
  const verificationToken = uid(15);

  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  
  newUser.setPassword(password);
  newUser.save();
  
  const mail = {
    to: email,
    subject: "Сonfirmation of registration",
    html: `<a href="http/localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click to confirm</a>`,
  };

  await sendEmail(mail);

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
