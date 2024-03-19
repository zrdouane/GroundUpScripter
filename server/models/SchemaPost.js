const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Represents a post schema.
 *
 * @typedef {Object} SchemaPost
 * @property {string} title - The title of the post.
 * @property {string} body - The body content of the post.
 * @property {Date} createdAt - The date and time when the post was created.
 * @property {Date} updatedAt - The date and time when the post was last updated.
 */
const SchemaPost = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', SchemaPost);