const express = require('express');
const {json} = require('body-parser');
const mongoose = require('mongoose');

const masterRoutes = require('./server/masterRoutes.js');

const port = 8080;
const app = express();

const mongoUri = `mongodb://localhost:27017/products`;
mongoose.connect(mongoUri);

app.use(express.static(__dirname + '/public'));
app.use(json());
////////////////

masterRoutes(app);

////////////////
app.listen(port, ()=>{
	console.log(`Express running on ${port}`);
});

mongoose.connection.once(`open`, ()=>{
	console.log(`Mongoose running on ${mongoUri}`);
});

