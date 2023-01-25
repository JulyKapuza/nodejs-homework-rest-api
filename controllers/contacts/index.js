const getContacts = require("./getAll");
const getById = require('./getById');
const addContacts = require('./addContacts');
const changeContact = require('./changeContact');
const updateFavorite = require('./updateFavorite');
const deleteContact = require("./deleteContact");

module.exports = {
  getContacts,
  getById,
  addContacts,
  changeContact,
  updateFavorite,
  deleteContact,
};