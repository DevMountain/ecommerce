var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  title: { type: String},
  description: { type: String},
  price: {type: String}
});

module.exports = mongoose.model('Turbo', ProductSchema);
