const {Contact} = require('../../models/index')

/* -------------------------------------------------------------------------- */
/*                                   @ GET /api/contacts                      */
/* -------------------------------------------------------------------------- */
const getContacts = async (_, res, ) => {
  const contactsList = await Contact.find();
    res.json({
      status: "success",
      code: 200,
      contactsList,
    });
};

module.exports = getContacts;
