const createError = require("http-errors");
const { User } = require("../../models");

/* -------------------------------------------------------------------------- */
/*           @ PATCH / api / users /: userId / subscription                */
/* -------------------------------------------------------------------------- */

const updateSubscription = async (req, res) => {
  const { userId } = req.params;

  const result = await User.findByIdAndUpdate(userId, req.body, { new: true });
  if (!result) {
    throw createError(404, " Not found ");
  }
  const { subscription, email } = result;
  res.json({
    status: "success",
    code: 200,
    updateSubscription: subscription,
    email: email,
  });
};

module.exports = updateSubscription;
