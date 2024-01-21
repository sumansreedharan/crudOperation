const express = require('express')
const employeeRoute = express()
const employeeController = require('../controller/employeeController')
const authMiddleware = require('../middleware/authMiddleware')

employeeRoute.post('/employees', authMiddleware, employeeController.createEmployee);
employeeRoute.get('/employees/:employeeId', authMiddleware, employeeController.getEmployeeDetails);
employeeRoute.put('/employees/:employeeId', authMiddleware, employeeController.editEmployee);
employeeRoute.delete('/employees/:employeeId', authMiddleware, employeeController.deleteEmployee);

module.exports = employeeRoute;