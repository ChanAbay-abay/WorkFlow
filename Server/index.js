

// Import necessary modules
var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// Import employeeRoutes
const employeeRoutes = require('./src/routes/employee.routes')

// Create Express app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Use the employeeRoutes for '/api/v1/employees' path
app.use('/api/v1/employees', employeeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});



// app.get('/',(req,res) =>{
// 	res.send("hello Vince Ranie Berioso");

// });

// app.listen(port,() =>{
// 	console.log(`server is listening on port ${port}`);
// });