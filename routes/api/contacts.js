const e = require("express");
const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(9).max(12).required(),
});

/* -------------------------------------------------------------------------- */
/*                                   @ GET /api/contacts                      */
/* -------------------------------------------------------------------------- */

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.json({
      status: "success",
      code: 200,
      contactsList,
    });
  } catch (error) {
    next(error);
  }
});
/* -------------------------------------------------------------------------- */
/*                            GET /api/contacts/:id                           */
/* -------------------------------------------------------------------------- */
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const list = await getContactById(contactId);

    if (list.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});
/* -------------------------------------------------------------------------- */
/*                           POST / api / contacts;                           */
/* -------------------------------------------------------------------------- */
router.post("/", async (req, res, next) => {
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
    next(error);
  }
});
/* -------------------------------------------------------------------------- */
/*                          DELETE /api/contacts/:id                          */
/* -------------------------------------------------------------------------- */

router.delete("/:contactId", async (req, res, next) => {
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
    next(error);
  }
});

/* -------------------------------------------------------------------------- */
/*                            PUT /api/contacts/:id                           */
/* -------------------------------------------------------------------------- */
router.put("/:contactId", async (req, res, next) => {
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
});

module.exports = router;
