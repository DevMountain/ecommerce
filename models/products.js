var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  Title: { type: String, unique: true, required: true, index: true},
  Description: { type: String, required: true},
  Price: {type: Number, required: true, minimum: 0}
});

module.exports = mongoose.model('product', schema);
