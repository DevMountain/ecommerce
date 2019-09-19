const mainCtrl = require('./mainCtrl.js');

module.exports = (app) =>{
	app.get('/api/products', mainCtrl.getProductByQuery);
	app.get('/api/products', mainCtrl.getProducts);
	app.get('/api/products/:id', mainCtrl.getProduct);
	app.post('/api/products', mainCtrl.createProduct);
	app.put('/api/products/:id', mainCtrl.updateProduct);
	app.delete('/api/products/:id', mainCtrl.deleteProduct);
}