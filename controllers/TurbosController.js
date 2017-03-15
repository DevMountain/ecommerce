var Turbo = require('../models/turbos');

module.exports =
{
  create: function(req, res, next) {
    var product = new Turbo(req.body);
      Turbo.save(function(err, turbo) {
        if(err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(turbo);
        }
      })

  },
  read: function(req, res, next) {
    Turbo.find().exec(function(err, response){
        if(err) {
          res.status(500).json(err)
        } else {
          res.json(response)
        }
      });
  },
  update: function(req, res, next) {
    Turbo.Update({_id: req.params.id}, req.body, function(error, response){
      if(error) {
        return res.status(500).json(error)
      } else {
        return res.json(response)
      }
    });
  },
  show: function(req, res, next) {
    Turbo.findById(req.params.id, function(err, response){
        if(err) {
          res.status(500).json(err)
        } else {
          res.json(response)
        }
      });
  },
  destroy: function(req, res, next) {
    Product.findByIdAndRemove(req.params.id, function(error, product){
      if(error) {
        return res.status(500).json(error)
      } else {
        return res.json(response)
      }
    });
  },
};
