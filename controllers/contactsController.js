const e = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");

const { contactSchema } = require("../schemas/validation");

/* -------------------------------------------------------------------------- */
/*                                   @ GET /api/contacts                      */
/* -------------------------------------------------------------------------- */
const getContacts = async (req, res) => {
  try {
    const contactsList = await listContacts();
    res.json({
      status: "success",
      code: 200,
      contactsList,
    });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
};
/* -------------------------------------------------------------------------- */
/*                            GET /api/contacts/:id                           */
/* -------------------------------------------------------------------------- */

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const list = await getContactById(contactId);

    if (list.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
};
/* -------------------------------------------------------------------------- */
/*                           POST / api / contacts;                           */
/* -------------------------------------------------------------------------- */
const addContacts = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const newContact = req.body;
    const list = await addContact(newContact);

    res.status(201).json({
      status: "success",
      code: 201,
      list,
    });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
};
/* -------------------------------------------------------------------------- */
/*                          DELETE /api/contacts/:id                          */
/* -------------------------------------------------------------------------- */
const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const list = await removeContact(contactId);

    if (!list) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 204,
      message: "contact deleted",
      list,
    });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
};
/* -------------------------------------------------------------------------- */
/*                            PUT /api/contacts/:id                           */
/* -------------------------------------------------------------------------- */
const changeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = req.body;

    const { error } = contactSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const list = updateContact(contactId, data);
    if (!list) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      list,
    });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getContacts,
  getById,
  addContacts,
  deleteContact,
  changeContact,
};
