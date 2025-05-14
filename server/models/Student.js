const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
