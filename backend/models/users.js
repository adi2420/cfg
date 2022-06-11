//name, email, password, technical skills, non technical skills,college, qualifi,semester,

const mongoose = require('mongoose');
let user = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  technical: { type: Array, required: true },
  nonTechnical: { type: Array, required: true },
  semester: { type: Number, required },
  qualification: { type: String, required: true },
  college: { type: String, required: true },
  tests: {
    marks_technical: {
      test1: Number,
      test2: Number,
      test3: Number,
      test4: Number,
    },
    marks_nontechnical: {
      test1: Number,
      test2: Number,
    },
  },
});

module.exports = mongoose.model('User', user);
