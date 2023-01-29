const { Contact } = require("../../models/index");

/* -------------------------------------------------------------------------- */
/*                           POST / api / contacts;                           */
/* -------------------------------------------------------------------------- */
const addContacts = async (req, res) => {
  const { _id } = req.user;
  const list = await Contact.create({...req.body, owner: _id});

  res.status(201).json(list);
};

module.exports = addContacts;
