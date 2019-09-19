const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
	title: {type: String, unique: true, required: true, index: true},
	price: {type: Number, required: true, min: 0},
	description: {type: String, required: true}
});

module.exports = mongoose.model('Product', ProductSchema);