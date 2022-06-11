//company name, password,email, jd dropdown{technical skills, non-tech skills},

const mongoose = require('mongoose');
let company = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Company', company);
