const { Contact, joiSchema, joiFavorite } = require("./contacts");
const {
  User,
  joiSignUpSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  verifyEmailSchema,
} = require("./user");

module.exports = {
  Contact,
  joiSchema,
  joiFavorite,
  User,
  joiSignUpSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  verifyEmailSchema,
};
