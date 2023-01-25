const { Contact } = require("../../models/index");

/* -------------------------------------------------------------------------- */
/*                           POST / api / contacts;                           */
/* -------------------------------------------------------------------------- */
const addContacts = async (req, res) => {
  const list = await Contact.create(req.body);

  res.status(201).json(list);
};

module.exports = addContacts;
