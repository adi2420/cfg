const mongoose = require('mongoose');
let feedback = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
});

module.exports = mongoose.model('Feedback', feedback);
