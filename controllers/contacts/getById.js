const createError = require("http-errors");
const { Contact } = require("../../models/index");

/* -------------------------------------------------------------------------- */
/*                            GET /api/contacts/:id                           */
/* -------------------------------------------------------------------------- */

const getById = async (req, res) => {
  const { contactId } = req.params;
  const list = await Contact.findById(contactId);

  if (!list) {
    throw createError(404, "Not found");
  }
  res.status(200).json(list);
};

module.exports = getById;
