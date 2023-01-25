const createError = require("http-errors");
const { Contact } = require("../../models/index");

/* -------------------------------------------------------------------------- */
/*                          DELETE /api/contacts/:id                          */
/* -------------------------------------------------------------------------- */
const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const list = await Contact.findByIdAndRemove(contactId);

  if (!list) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 204,
    message: "contact deleted",
    list,
  });
};

module.exports = deleteContact;
