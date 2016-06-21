const express = require('express');
const {json} = require('body-parser');

const masterRoutes = require('./server/masterRoutes.js');
// const mainCtrl = require('./server/controllers/mainCtrl.js')

const port = 8080;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(json());
////////////////

masterRoutes(app);

////////////////
app.listen(port, ()=>{
	console.log(`Express running on ${port}`);
})
