
// Import necessary modules
var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// Import userRoutes
const userRoutes = require('./src/routes/user.routes')

// Create Express app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Use the userRoutes for '/api/v1/user' path
app.use('/api/v1/user', userRoutes);

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