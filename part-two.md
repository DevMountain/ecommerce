<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

eCommerce Project - Part II
============================

[Part I](/part-one.md)

[Part III](/part-three.md)

## eCommerce Project - Part II

### Objectives

####

Build a backend using Node, Express, and MongoDB and connect it to a front-end Angular application.

During this project you will practice using an ORM (Mongoose) to work with your database.  You will also solidify your understanding of models, schemas, middleware, and indexing.

##### Resources
* [Mongoose] (http://mongoosejs.com/)

##### The Domain

We'll continue building the eCommerce application.

Today you are going to convert the current Mongo functionality to use Mongoose.  You will be creating a Product model and replacing the current product functionality with that model.

### Set up Mongoose

####

At your application's root folder, run the following command via command line: `npm uninstall --save mongojs`.  This will remove mongojs from your node_modules folder and from your package.json.  Remove or comment out any logic related to MongoJS.

After removing everything MongoJS related, you should be able to start up your server and run it without any errors.

Now that MongoJS is removed, install Mongoose and follow the [instructions](http://mongoosejs.com/docs/connections.html) to connect to MongoDB.  In your code, connect to Mongo after your Express app has started listening.  

**TestPoint**: After setting up Mongoose, you should be able to listen with your Express app and with Mongoose.  The Mongoose connection method can optionally take a callback as the last argument.  That callback sends one argument, `error`.  `console.log` the `error` parameter.  If it's undefined, you've connected correctly. See [this SO](http://stackoverflow.com/questions/6676499/is-there-a-mongoose-connect-error-callback) answer for an example.

####

**Mongoose connection**
```
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products');
```


### Step 2: Create Product Model

####

Remove or comment out the logic from your endopints that handle creating, reading, updating, and deleting products.  You are going to create a Mongoose Product model and do your CRUD actions that way.

Create a new Product schema and model.  Give it the following fields:

 - **Title**: This will be the title of the product
  - String
  - Unique
  - Required
  - Index
 - **Description**: This will describe your product
  - String
  - Required
 - **Price**: This will be the price of your product
  - Number
  - Required
  - Minimum of 0

Feel free to add any additional fields you feel are necessary.

####

A lot of this is things we learned in node.
* Create a new file
* require mongooose
* create your schema
* export a model built from a schema

**Creating a schema**

To create a schema we invoke `mongoose.Schema()` function and pass in an object with the fields we want.
To define a type we set the value equal to an object.

This creates a schema with one property, name, that is a required and unique string.
```
mongoose.Schema({
    name: { type: String, required: true, unique: true}
})
```

**Creating a model**
Once we've built our schema object we want to save it to a variable so that we can make a model with it.
That structure looks like this:

`mongoose.model('[collectionName]', schemaObj)`

We want to export this model.

####
**Code**
```
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema

var schema = new Schema({
  title       : {type: String, unique: true, required: true, index: true}
, description : {type: String, required: true}
, price       : {type: Number, required: true, min: 0}
})

module.exports = mongoose.model('product', schema)

```


### Update our queries to use mongoose

####

Now go to each of your product endpoints and put the necessary Mongoose logic to [Create](http://mongoosejs.com/docs/api.html#model_Model.create), [Read](http://mongoosejs.com/docs/api.html#model_Model.find), [findById](http://mongoosejs.com/docs/api.html#model_Model.findById),  [Update](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate) and [Delete](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove) products. Refer to those links for documentation.

**TestPoint**: At this point you should be able to manipulate the product data via your Express endpoints just like you could when MongoJS was installed.  Test this using POSTMan and the command line or RoboMongo.  After you test the endpoints, go to your front-end product interface (if you were able to build it yesterday) and make sure that the interface still works and manipulates the data like you expect. You may have to update your data models on the front-end to match the model we just set up with Mongoose.

The next step will integrate your backend to the front-end application that you built yesterday.  You will also expand the application to include new functionality.

####

Mongoose queries work almost identically to mongo queries.  The differences:
* Instead of using the db object from a connection we just make a 'model' and use the model directly.
* Some of the terms are slightly different.

That's about it.  Callbacks, object structure, queries, all work pretty much the same.

**General flow**

* Require your model at the top of the file you want to use it in and save it to a variable.
* Use the model to do the query you want
* Send a response back to the user

####

**Updated queries**

##### Find many query
```
Product.find(req.query, function(err, response){
    if(err) {
      res.status(500).json(err)
    } else {
      res.json(response)
    }
  })
```

##### Find one query
```
Product.findById(req.params.id, function(err, response){
    if(err) {
      res.status(500).json(err)
    } else {
      res.json(response)
    }
  })
```

##### post query
```
Product.create(req.body, function(error, response){
   if(error) {
     return res.status(500).json(error)
   } else {
     return res.json(response)
   }
 })
```

##### update query
```
Product.findByIdAndUpdate(req.params.id, req.body, function(error, response){
  if(error) {
    return res.status(500).json(error)
  } else {
    return res.json(response)
  }
});
```

##### update query
```
Product.findByIdAndRemove(req.params.id, function(error, response){
  if(error) {
    return res.status(500).json(error)
  } else {
    return res.json(response)
  }
})
```


### Cleaning up our code

####

It is important to keep your code looking clean and neat.  It would be wise for you to outsource the logic from each of your endpoints to a product controller or something similar.  You should also outsource your schema and model declarations to a Product model file.  If you need reminders on how Node's require and export system works, check out [this](http://openmymind.net/2012/2/3/Node-Require-and-Exports/) blog post.

### Connect Front-End

####

Endpoints are how a front end and back end communicate.  Urls, parameters, queries, and bodies.  That's it.  We didn't change any of those today.  We only changed what was going on underneath.  So our front end should still work!

Make sure that you have an interface where users can view products and add them to their cart.  

**TestPoint**: You should now be able to see all of the products on the front-end.

Once you've finished the front-end, take some time to style your app and make it user-friendly.  Tomorrow you will finish the app by adding a a cart to the user, allow them to check out, and keep track of their current and past orders.


### Copyright

####

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.
