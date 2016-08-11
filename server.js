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
app.post('/turbos', productsController.create);
app.get('/turbos', productsController.read);
app.get('/turbos:id/', productsController.show);
app.put('/turbos:id/', productsController.update);
app.delete('/turbos:id/', productsController.destroy);



// app.get('/')
mongoose.connect('mongodb://admin:admin@ds027165.mlab.com:27165/ecommerce', function(err) {
    if (err) throw err;
});
//endpoints..........

app.get('/test', function(req, res) {
  res.send("Yo");
});

//......BACKEND>>>>>>>FRONTEND CONNECTION
app.use(express.static('public'));

//connection..........
var port = 3030;

app.listen(port, function(){
  console.log('Good morning, welcome to port', port);
});
