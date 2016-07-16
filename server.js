var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('bodyParser');


//express..........
var app = express();

//middleware..........
app.use(bodyParser());
app.use(cors());

mongoose.connect('mongodb://localhost/products');

//endpoints..........
// app.get('/')

//connection..........
var port = 3030;
app.listen(port, function(){
  console.log('Good morning, welcome to port', port;)
});
