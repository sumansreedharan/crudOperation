const Employee = require("../models/employeModel");
const jwt = require("jsonwebtoken");

const createEmployee = async (req, res) => {
  try {
    console.log("Registration request received:", req.body);

    await Employee.create({
      employeeId: req.body.employeeId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      department: req.body.department,
      position: req.body.position,
    });
    

    console.log("User registered successfully");

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error.message);
    console.error("Registration error:", error);

    res.json({ status: "error", error: "duplicate" });
  }
};

const editEmployee = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const dob = req.body.dob;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { firstName, lastName, email, dob },
      { new: true }
    );

    if (updatedEmployee) {
      res.json({
        status: "ok",
        firstName: updatedEmployee.firstName,
        lastName: updatedEmployee.lastName,
        email: updatedEmployee.email,
        dob: updatedEmployee.dob
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEmployeeDetails = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const employeeDetails = await Employee.findById(employeeId);

    if (!employeeDetails) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({
      status: 'ok',
      employeeDetails: {
        firstName: employeeDetails.firstName,
        lastName: employeeDetails.lastName,
        email: employeeDetails.email,
        dob: employeeDetails.dob,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({
      status: 'ok',
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports = {
  createEmployee,
  editEmployee,
  getEmployeeDetails,
  deleteEmployee
}