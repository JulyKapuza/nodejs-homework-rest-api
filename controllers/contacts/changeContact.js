const createError = require("http-errors");
const { Contact } = require("../../models/index");

/* -------------------------------------------------------------------------- */
/*                            PUT /api/contacts/:id                           */
/* -------------------------------------------------------------------------- */
const changeContact = async (req, res) => {
  const { contactId } = req.params;

  const list = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
  if (!list) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    list,
  });
};

module.exports = changeContact;
