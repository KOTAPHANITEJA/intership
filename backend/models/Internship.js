const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  isFavourite: { type: Boolean, default: false }
});

module.exports = mongoose.model('Internship', internshipSchema);