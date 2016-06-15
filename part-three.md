<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

eCommerce Project - Part III
============================

[Part I](/part-one.md)

[Part II](/part-two.md)

## Part III

### Objective

####

Build a backend using Node, Express, and MongoDB and connect it to a front-end Angular application.

During this project you will use Mongoose to create relationships between multiple sets of data.

##### Resources
* [Mongoose] (http://mongoosejs.com/)

##### The Domain

Today you are going to create two new schemas, one for Orders and one for Carts.  You are also going to create a relationship between Carts and Products using a reference, a relationship between Orders and Products using embedding, and a relationship between Orders and Users using reference.

### Create The order schema

####

Create a schema for orders.  Add whatever fields you feel it might need.  

*Orders should have two special relationships: a reference to a user, and embedded products.*

Create the Order model with your schema and export it.

####

**Refs**

Refs on an object schema are made by specifying the type as `Schema.Types.ObjectId`, AND adding a `ref: [modelName]` key on that same schema.

IE - If I have a Pet with a reference to an Owner it would look like this:

```
var petSchema = new mongoose.Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Owner'}
})
```

**Embedded Schema**

Embedded Schema is made by specifying the type as a pre-made Schema object.   

IE - If I have an owner with multiple pets:

* Make a pet schema
* Make an owner schema
* In the owner schema add an array of pets
  * The array of pets should be of type petSchema

This would look like this on the owner side

```
var petSchema = require('./petSchema');

var owner = new mongoose.Schema({
  pets: [{type: petSchema}]
})
```

**Notes on sharing schema**
Shared schema doesn't have to be in another file, but it's usually cleaner.

If I do put it in another file I need to export the schema object.  I would NOT make a mongoose.model using the schema.

####

__Code__
```
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema

var schema = new Schema({
  user     : {type: Schema.Types.ObjectId, ref: 'User', required: true}
, products : [{
    item     : productSchema
  , quantity : {type: Number, required: true, min 1}
  }]
, ordered : {type: Date, default: new Date()}
})

module.exports = mongoose.model('orders', schema)
```


### Create The cart schema
Create a schema for carts.  Add whatever fields you feel it might need.  

*Carts should have an array of references to products.*

Once you've created your schema, export it (NOT as a model).  Then go to your User model and use the cart schema for the User's cart field.

*Note*:  This may seem confusing.  Technically, you could just define the new fields in the User's schema.  But it's important to know that a schema is just a pattern or blueprint to follow.  It can be used in multiple models.  For clarification on the difference between a schema and a model see [this SO post](http://stackoverflow.com/questions/22950282/schema-vs-model).

**TestPoint**: You should be able to spin up your server without any errors.  You should also be able to test that your new Order model and new cart schema are working.  You can either create a dummy endpoint and hook it up to your models, or write a script in your server.js file and run it on server load.  Test and make sure that you can create new Orders and add items to a user's cart.

If you've passed this TestPoint, then you have essentially set up your relationships.  Good work!  Let's walk through how you are going to work with these relationships.

####

We're using an embedded schema just like in the prior step.

####
__cartSchema.js__
```
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema

var schema = new Schema({
  products : [{
    item     : {type: Schema.Types.ObjectId, ref: 'product', required: true}
  , quantity : {type: Number, min: 1}
  }]
})

module.exports = schema;
```

__userModel.js__
```
var mongoose = require('mongoose')
  , cart     = require('./cart')

var schema = new mongoose.Schema({
  name     : {type: String, required: true}
,	email    : {type: String, required: true, unique: true, index: true}
, password : {type: String, required: true}
, cart     : [cart]
, orders   : []
})

module.exports = mongoose.model('User', schema)
```

### Create Endpoints

####

Create the following Express endpoints:
 * **POST** `/api/user/`
 * **POST** `/api/order/:user_id`
 * **GET** `/api/order/`
 * **POST** `/api/cart/:user_id`
 * **PUT** `/api/cart/:user_id`
 * **GET** `/api/user/:id`

### Cart POST

####

With the cart POST endpoint, you will expect a request parameter of `user_id` that will be the id of a user. The request body will have a JSON of the product that is being added to the cart, including a quantity.  
We have the id of the user we want to update, and the item we want to add to the cart.
Use findByIdAndUpdate with [$push](https://docs.mongodb.org/manual/reference/operator/update/push/) to add your item to the cart

*Note*: At some point you may realize that the models you created earlier are not complete enough for what we're trying to do.  Feel free to go back and change your models to make them work.

####

__$push__
$push is a way to tell mongo to 'push' the value into an array instead of overriding an existing array.  
If I had an owner with an array of pets I would write something like this to add a new pet

```
Owner.findByIdAndUpdate([userId], {$push: {pets: newPetObj}})
```

This is going to find the user with the id we pass it, then `push` into the `pets` property a value of whatever is on our `newPetObj`

####
__code__  

```
User.findByIdAndUpdate(req.params.user_id, {$push: {cart: req.body}}, function(err, res){
      //handle the response here by checking for err etc.  Just like existing handlers.
  })
```

### Cart PUT

####

The cart PUT endpoint will be similar, but is intended to change the quantity of a particular item in the cart. If the new quantity is 0, simply remove the item from the cart altogether. We should get two properties on our req.query , a qty and itmId

####

There isn't a one operation way to update the data while it's in the collection.  

The url we'll use to hit this endpoint will look like this :

`/api/cart/:user_id?qty=value&itmId=value`

`http://localhost:9001/api/cart/abd3a-hoibzxcli-23bklasdv-asef/?qty=3&itmId=hoinbs-aw43lnvas-aslisd-alnxcibo`




That gives us the user id, id of the item we want to update, and the qty we want to update.

Use the user id to get the user out.
Once you have the user find the item in the cart with the matching id and update the quantity.  
If the new quantity is 0 remove it instead.

Save the entire user back to the database.

####
__code__
```
User.findById(req.params.user_id, function(err, resp) {
     if (err) {
       res.status(500).send(err)
     }
     var myUser = resp;
     var qty = req.query.qty / 1;
     var foundItem = -1;
     myUser.cart.forEach(function(cartItem, index) {
       if (cartItem._id.toString() === req.query.itmId) {
         foundItem = index
       }
     })
     if (foundItem >= 0) {
        console.log("Found Item = " + foundItem)
       if (qty === 0) {
         myUser.cart.splice(foundItem, 1);
       } else {
         myUser.cart[foundItem].qty = qty
       }
     }
     saveUser(myUser, req, res);
   })
   function saveUser(userToSave, req, res) {
     userToSave.save(function(err, result) {
       if (err) {
         res.status(500).send(err)
       } else {
         res.send(result)
       }
     })
   };
}
```

### User GET

####

We need to send the entire cart whenever the user is retrieved.  Look at Mongoose's [.populate()](http://mongoosejs.com/docs/populate.html) method.  Wherever you are getting your user, add the .populate to populate your cart before sending it to the client.

####

To get populate to work we want to use their 'exec' syntax.  When writing the query this way we pass the pieces in to small chained functions, and then when we're all done we call exec.

IE - Let's assume we have an owner with pets.  The pets array has a `ref` to another collection called `breeds`.  A piece of data might look like this:
```
{
  firstName: 'Johno',
  lastName: 'Smith',
  pets: [
    {
      breed: 'asdf-adf-gbaewg-asd-se',
      name: 'sparky'
    },
    {
      breed: 'dgasd-agasdg-uyjk-fbe',
      name: 'donut'
    }
  ]
}

```

The breed isn't a real breed!  Because it's a ref all we have is an id. That id matches a document in our breeds collection.  
When using populate we're telling mongo replace that id with the entire document from the breeds collection.  
That query looks something looks something like this.

```
Owner
  .findOne({lastName: 'Smith'})
  .populate('pets/breed')
  .exec(function(err, owner){

})
```


####
```
User
  .findById(req.params.user_id)
  .populate('cart/product')
  .exec()
  .then(function(results){
    //Yay it worked, return it
  }, function(err){
    //Uh oh, problemo.  Return a 500 status and the error.
  })

})
```

### Order POST

####

With the order POST endpoint, send a request param of `user_id` that will include the id a user.  In the handler, get the user's cart and create a new order with the products in the cart.  Make sure you use the user's id to reference from the order to the user. After successfully creating the order, empty the user's cart.

There isn't anything new that we haven't done here so give it a try.

**TestPoint**:  Create a new user and add several items to their cart.  Then take their id and hit the `/api/order` endpoint with it (via Postman or your Angular application).  It should create a a new order and empty the user's cart.  Use MongoChef or the command line to check the data.

####

Here is the flow with some hints:
__PseudoCode__
```
userId = req.params.user_id
User.findById
  //Handle errors
  user = result
  newOrder = buildOrder(user)
  newOrder.save
    //Handle Errors
    user.cart = []
    user.orders.push( ObjectId(newOrder.id))
    user.save
      //Handle Errors
      //return success result
```

####
__code__

```
create: function(req, res) {
  var userId = req.params.userId;
  User.findById(userId, function(err, result) {
    if (err) {
      res.sendStatus(500);
    }
    var userObj = result;
    var userOrder = {};
    userOrder.products = userObj.cart;
    userOrder.userId = userId;
    var newOrder = new Order(userOrder);
    newOrder.save(function(err, result) {
      if (err) {
        res.sendStatus(500);
      }
      userObj.cart = [];
      userObj.orders.push(mongoose.Types.ObjectId(result._id));
      // userObj.update({$push: {orders: mongoose.Types.ObjectId(result._id)}},
      userObj.save(function(err, result) {
        if (err) {
          res.sendStatus(500);
        }
        res.send(result);
      });
    });
  });
}
```


### Order GET

####

With the order GET endpoint, simply accept a reqeust query of whatever orders you're searching for.  For example, if you were looking for all orders placed on a certain day, the URL might look like this: `/api/order?date=07/09/16`.  If you were looking for a specific user's orders, it might look like so: `/api/order?user=o09f6d8fnn7df7n9joj`.  Look at Mongoose's [query](http://mongoosejs.com/docs/queries.html) documentation if you need some examples.

**TestPoint**: You should be able to test your order GET endpoint via Postman or your app.  Try a few different queries.  The most important one is the user query.

If you've passed this last breakpoint, then  you've finished the backend of your application. Well done.

####

If you looked at this you're over thinking the problem.  

Take the req.query and pass it into a mongo query on the orders table as the criteria.  
Return the results!

####

__code__

```
Order.find(req.query, function(err, result) {
      if (err) {
        res.sendStatus(500);
      }
      res.send(result);
    });
```

### Connect front-end

####

Take some time to connect your Express API to your Angular application.  You have a lot of freedom in how you do that.  Make sure that you have the ability to add items to a user's cart (you might create a dropdown menu to select a user, since there is no authentication yet), view the cart, create a new order, and view that order.  If you finish that with ample time, add some extra styling and/or functionality.

**Breakpoint**: You should be able to add items to a user's cart, view the cart, create and view orders.

If you pass that breakpoint, then congrats!  You've just built your first full-stack application!  What you've just done is the basics of building any CRUD app.

### Contributions

####

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.


### Copyright

####

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">