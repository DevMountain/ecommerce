// const mongodb = require('mongojs');
// let db = mongodb('ecommerce', ['products']);
const Product = require('./Product.js')

module.exports = {
	getProducts(req, res, next){
		Product.find({}, (error, products)=>{
			if (error) {
				return res.status(500).json(error);
			}
			return res.status(200).json(products);
		});
	},

	getProductByQuery(req, res, next){
		Product.find(req.query, (error, products)=>{
			if (error) {
				return res.status(500).json(error);
			}
			return res.status(201).json(products);
		})
	},

	getProduct(req, res, next) {
		Product.findById(req.params.id, (error, product)=>{
			if (error) {
				return res.status(500).json(error);
			}
			return res.status(200).json(product);
		})
	},

	createProduct(req, res, next){
		new Product(req.body).save((error, productCreated)=>{
			if (error) {
				return res.status(500).json(error);
			}
			return res.status(201).json(productCreated);
		})
	},

	deleteProduct(req, res, next){
		if (!req.params.id) {
			return res.status(500).json("Need a param Id");
		}
		Product.findByIdAndRemove(req.params.id, (error, deletedProduct)=>{
			if (error) {
				return res.status(500).json(error);
			}
			return res.status(200).json(deletedProduct);
		})
	},

	updateProduct(req, res, next){	
		if (!req.params.id) {
			return res.status(500).json("Need a param Id");
		}
		Product.findByIdAndUpdate(req.params.id, req.body, (error, updatedProduct)=>{
			if (error) {
				return res.status(500).json(error);
			}
			return res.status(200).json(updatedProduct);
		})
	},
}










