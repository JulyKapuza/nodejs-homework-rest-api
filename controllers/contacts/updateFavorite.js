const createError = require("http-errors");
const { Contact } = require("../../models/index");

/* -------------------------------------------------------------------------- */
/*           @ PATCH / api / contacts /: contactId / favorite                 */
/* -------------------------------------------------------------------------- */
const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  const list = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!list) {
    throw createError(404, " Not found ");
  }
  res.json({
    status: "success",
    code: 200,
    list,
  });
};

module.exports = updateFavorite;
