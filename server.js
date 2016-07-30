var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');


//express..........
var app = express();

//middleware..........
app.use(bodyParser());
app.use(cors());

//controllers......

var productsController = require('./controllers/productsController')

//endpoints..........
app.post('/products', productsController.create);
app.get('/products', productsController.read);
app.get('/products:id/', productsController.show);
app.put('/products:id/', productsController.update);
app.delete('/products:id/', productsController.destroy);



// app.get('/')
mongoose.connect('mongodb://admin:admin@ds027165.mlab.com:27165/ecommerce', function(err) {
    if (err) throw err;
});
//endpoints..........

app.get('/test', function(req, res) {
  res.send("Yo");
});


//connection..........
var port = 3030;

app.listen(port, function(){
  console.log('Good morning, welcome to port', port);
});
