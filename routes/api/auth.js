const express = require("express");
const { users: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const {
  joiSignUpSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validation(joiSignUpSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.currentUser));

router.patch(
  "/:userId/subscription",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
