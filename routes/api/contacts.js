const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, joiFavorite } = require("../../models");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContacts));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(ctrl.changeContact)
);

router.patch(
  "/:contactId/favorite",
  validation(joiFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

module.exports = router;
