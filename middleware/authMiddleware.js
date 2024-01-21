const jwt = require("jsonwebtoken");
const Employee = require("../models/employeModel");

async function Auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "SECRET123");

    const { id } = decoded;
    const employee = await Employee.findById(id);
    if (employee) {
      req.employee = employee;
    } else {
      res.json({ status: "error" });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = Auth;
