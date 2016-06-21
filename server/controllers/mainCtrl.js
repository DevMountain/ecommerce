const mongodb = require('mongojs');
let db = mongodb('ecommerce', ['products']);


module.exports = {
	getProducts(req, res, next){
		db.products.find({}, (error, response) =>{
			if (error) {
				return res.status(500).json("error");
			}else{
				return res.status(200).json(response);
			}
		});
	},

	getProductByQuery(req, res, next){
		db.products.find(req.query, (error, response)=>{
			if (error) {
				return res.status(500).json("error");
			}else{
				return res.status(200).json(response);
			}
		});
	},

	getProduct(req, res, next) {

		db.products.findOne({_id : mongodb.ObjectId(req.params.id)}, (error, response) =>{
			if (error) {
				return res.status(500).json("error");
			}else{
				return res.status(200).json(response);
			}
		})
	},

	createProduct(req, res, next){
		db.products.save(req.body, (error, response) =>{
			if (error) {
				return res.status(500).json("error");
			}else{
				return res.status(200).send(response);
			}
		});
	},

	deleteProduct(req, res, next){
		if (!req.params.id) {
			return res.status(500).json("Need a param Id");
		};
		db.products.remove({_id : mongodb.ObjectId(req.params.id)}, (error, response)=>{
			if (error) {
				return res.status(500).json("error");
			}else{
				return res.status(200).json(response);
			}
		})
	},

	updateProduct(req, res, next){	
		if (!req.params.id) {
			return res.status(500).json("Need a param Id");
		};
		db.products.update(
			{
				_id: mongodb.ObjectId(req.params.id)
			}, 
			req.body, (error, response)=>{
				if (error) {
					return res.status(500).json("error");
				}else{
					return res.status(200).json(response);
				}
			});
	},
}










