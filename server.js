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

var TurbosController = require('./controllers/TurbosController')
// var TurbosController = require('./controllers/SeatsController')

//endpoints..........
app.post('/turbos', TurbosController.create);
app.get('/turbos', TurbosController.read);
app.get('/turbos:id/', TurbosController.show);
app.put('/turbos:id/', TurbosController.update);
app.delete('/turbos:id/', TurbosController.destroy);

// app.post('/seats', SeatsController.create);
// app.get('/seats', SeatsController.read);
// app.get('/seats:id/', SeatsController.show);
// app.put('/seats:id/', SeatsController.update);
// app.delete('/seats:id/', SeatsController.destroy);



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
