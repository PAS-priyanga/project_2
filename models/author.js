const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email:{type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/],
  },}
, {
  timestamps: true
});

module.exports = mongoose.model('Author', authorSchema);