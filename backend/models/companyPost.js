//company name, password,email, jd dropdown{technical skills, non-tech skills},

const mongoose = require('mongoose');
let companyPost = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  job: { type: String, required: true },
  stipend: { type: Number, required: true },
  technical: { type: Array },
  nonTechnical: { type: Array },
  selectedStudent: {type: Array} 
});

module.exports = mongoose.model('CompanyPost', companyPost);
