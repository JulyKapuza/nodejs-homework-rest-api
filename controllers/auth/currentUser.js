/* -------------------------------------------------------------------------- */
/*                           @ GET / api / users /current                     */
/* -------------------------------------------------------------------------- */

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email: email,
        subscription: subscription,
      },
    },
  });
};

module.exports = currentUser;
