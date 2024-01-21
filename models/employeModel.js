const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
