const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const employeeRoutes = require('./routes/employeeRoute')
const cors = require("cors");


dotenv.config()
 
const app = express()
const PORT = 3000
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/api', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
