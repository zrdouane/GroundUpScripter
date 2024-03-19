const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Represents the user schema.
 *
 * @typedef {Object} SchemaUser
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */
const SchemaUser = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('User', SchemaUser);