<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

## Part I

### Objective

####

Build a simple backend using Node, Express, and MongoDB and connect it to a simple front-end Angular application

During this project, you will solidify your understanding of the MongoDB API.  You will also be able to see how the database fits into the bigger picture of a full application.


#####  Resources

* [MongoJS] (https://github.com/mafintosh/mongojs)
* [MongoDB Docs] (http://docs.mongodb.org/manual/)


##### The Domain

Most companies sell some sort of product and service. For this project we will simulate building an eCommerce application.  We will build this project over the course of the next three days.

Today we are going to set up our Node application, set up a basic API, add functionality to do CRUD actions with products, and create a simple front-end interface to be able to create, read, update, and delete products.

### Set up Express app

####

Set up your Node app. For this project, use MongoJS to work with MongoDB. In this step, you'll need to:
1. Install the necessary npm packages (express, bodyParser, cors, mongojs)
2. Require the modules in your server.js file
3. Create your Express app (no endpoints yet) and listen for connections


### Initialize your connection to Mongo

####

This is new, but give it a try.  We already brought in mongojs.  Use it to create a new connection to the database

**TestPoint**: At the end of this step, you should be able to run your file with node and connect to MongoDB without any errors in your console.

####

When we require mongojs it gives us a function.  This function takes in two parameters:
* The name of the database we want to connect to
* An array of any collections we want to work with

Our database name is going to be `ecommerce` and we're only going to work with a `products` collection.

####

**code**
```
var db = mongo('ecommerce', ['products']);
```

### Create Express API

####

Now you'll create endpoints to create, read, update, and delete products (CRUD).  Have them each send back a unique random string on the `res`.

Here are the API endpoints we will need:

`POST /api/products`

`GET /api/products`
`GET /api/products/:id`

`PUT /api/products/:id`

`DELETE /api/products/:id`

**TESTPOINT**: You should be able to hit each of your endpoints without error and see any parameters or queries that you're sending along the way.  Check by using Postman by returning random strings in your endpoint handlers.

*Note*: We haven't hooked up to Mongo yet. This is just to test our Express API.

####

**Making an endpoint reminder**

A node endpoint is made by registering it with our express app :

`app.[method]([url], [callbackFunction])`

IE

`app.get('/orders/:id', function(req, res){})`

####

**code**
```
app.get('/api/products', function(req, res){
  res.send("I am a random string in GET api/products");
});

app.get('/api/products/:id', function(req, res){
  res.send("I will GET you a present at api/products. It is a " + req.params.id);
});

app.post('/api/products', function(req, res){
  res.send("Jellyfish live in POST api/products");
});

app.put('/api/products/:id', function(req, res){
  res.send("Once I was a walrus but then I was PUT in api/products with " + req.params.id);
});

app.delete('/api/products/:id', function(req, res){
   res.send("I have deleted nothing, especially not " + req.params.id)
});
```


### Add a product

####

Complete the POST `/api/products` endpoint

**TESTPOINT**: At this point you should be able to hit the endpoint and have it use your database. Use Postman to hit your endpoint.  You should be able to get a response back in Postman, and be able to see your data being added in your database.  You can check your database via the terminal or [MongoChef](http://3t.io/mongochef/).

####

**Mongo Query**

An new item query is in this format :
`db.[collectionName].save(newObj, function(err, response){})`

It's pretty standard to have the client to send us the item they want to save in the correct format.  To do this they use the body.
Pass the body into the query as the newObj.

(Hint: Body is accessed by calling `req.body` because we set up bodyParser earlier in our app.  If it's empty your error is probably an incorrect setup of bodyParser.)

The function will be invoked when our database call is done.  We want to check for errors and return a 500 status code if we got any.
If we have no err then return our result.  Just to make sure it's valid json use `res.json` and pass in our response.

####
**code**
```
app.post('/api/products', function(req, res){
	db.products.save(req.body, function(error, response){
		if(error) {
			return res.status(500).json(error);
		} else {
			return res.json(response);
		}
	});
});
```

### Get All Products

####

Now you'll connect your Express API to Mongo. After each query/action to Mongo is complete, we'll send a response back to the client.

Complete the GET /api/products endpoint

For each of these steps we're going to use our db object we made when we set up our connection to mongo.

**TESTPOINT**: At this point you should be able to hit the endpoint and have it touching your database. Use Postman to hit your endpoint.  You should be able to get a response back in Postman, and be able to see your data being returned from your database.  You can check your database via the terminal or [MongoChef](http://3t.io/mongochef/).

####


**Mongo Query**

A find multiple items query is in this format :
`db.[collectionName].find({}, function(err, response){})`

The empty object means we have no criteria. and we just want all the records in [collectionName].  

The function will be invoked when our database call is done.  We want to check for errors and return a 500 status code if we got any.
If we have no err then return our result.  Just to make sure it's valid json use `res.json` and pass in our response.

**Use req.query in our database query**
_req.query is also an object._ We can pass req.query into our `find()`.  This will let us change the query to mongo just by changing what we send to the endpoint.


##### Just the title

The following url : http://localhost:9001/api/products?title=shoe

Will give us this object on req.query
```
{
  title: "shoe"
}
```
So if we give this to mongo we are asking for any documents with a title equal to shoe


##### title and color

The following url : http://localhost:9001/api/products?title=shoe&color=red

Will give us this object on req.query
```
{
  title: "shoe",
  color: "red"
}
```
If we give this to mongo we are asking for any documents with a title equal to shoe and a color equal to red

####
**code**
```
app.get('/api/products', function(req, res){
	var query = req.query;
	db.products.find(query, function(err, response){
		if(err) {
			res.status(500).json(err);
		} else {
			res.json(response);
		}
	});
});

```

### Get One Product

####

Complete the GET `/api/products/:id` endpoint

**TESTPOINT**: At this point you should be able to hit the endpoint and have it use your database. Use Postman to hit your endpoint.  You should be able to get a response back in Postman, and be able to see your data returned from your database.  You can check your database via the terminal or [MongoChef](http://3t.io/mongochef/).

####

**Mongo Query**

A find multiple items query is in this format :
`db.[collectionName].findOne(queryObj, function(err, response){})`

We need to build a query object or we'll just get the first record.  This endpoint takes in an :id parameter.

We can build a query object that uses that id to query Mongo.

(Hint: mongo ids are not called id, but something very close)
(Hint2: mongo id values also need to be wrapped in mongo.ObjectId)
(Hint3: query parameters are accessed with `req.params.[parameterName]`)

The function will be invoked when our database call is done.  We want to check for errors and return a 500 status code if we got any.
If we have no err then return our result.  Just to make sure it's valid json use `res.json` and pass in our response.

####
**code**
```
app.get('/api/products/:id', function(req, res){
	var idObj = {
		_id: req.params.id
	};
	db.products.findOne(idObj, function(err, response){
		if(err) {
			res.status(500).json(err);
		} else {
			res.json(response);
		}
	});
});

```

### Update a product

####

Complete the PUT `/api/products/:id` endpoint

**TESTPOINT**: At this point you should be able to hit the endpoint and have it use your database. Use Postman to hit your endpoint.  You should be able to get a response back in Postman, and be able to see your data being changed in your database.  You can check your database via the terminal or [MongoChef](http://3t.io/mongochef/).

####

**Mongo Query**

An update item query is in this format :
`db.[collectionName].update(queryObj, changesObj, function(err, response){})`

We need to build our queryObj.  We have our id from our parameters we just need to format it.
This is going to work exactly like it did in our `findOne()` above.
Pass the result in as the queryObj

It's pretty standard to have the client to send us a copy of item they want to save with the changes already made.  To do this they use the body.
Pass the body into the query as the changes.

The function will be invoked when our database call is done.  We want to check for errors and return a 500 status code if we got any.
If we have no err then return our result.  Just to make sure it's valid json use `res.json` and pass in our response.

####
**code**
```
app.put('/api/products/:id', function(req, res){
	if(!req.params.id){
		return res.status(400).send('id query needed');
	}
	var query = {
		_id: mongo.ObjectId(req.params.id)
	};
	db.products.update(query, req.body, function(error, response){
		if(error) {
			return res.status(500).json(error);
		} else {
			return res.json(response);
		}
	});
});
```

### Delete a product

####

Complete the DELETE `/api/products/:id` endpoint

**TESTPOINT**: At this point you should be able to hit the endpoint and have it use your database. Use Postman to hit your endpoint.  You should be able to get a response back in Postman, and be able to see your data being removed in your database.  You can check your database via the terminal or [MongoChef](http://3t.io/mongochef/).

####

**Mongo Query**

An delete item query is in this format :
`db.[collectionName].remove(queryObj, function(err, response){})`

The query object will delete all records matching the query.  If you send it an empty object it will delete everything.

In this case let's delete only a specific id.  Get the id from the req.params again just like in the update step and pass it in as our query object.
`_id` is guaranteed to be unique so by using that we can be sure to only delete the 1 record we want.

The function will be invoked when our database call is done.  We want to check for errors and return a 500 status code if we got any.
If we have no err then return our result.  Just to make sure it's valid json use `res.json` and pass in our response.

####
**code**
```
app.delete('/api/products/:id', function(req, res){
	if(!req.params.id){
		return res.status(400).send('id query needed');
	}
	var query = {
		_id: mongo.ObjectId(req.params.id)
	};
	db.products.remove(query, function(error, response){
		if(error) {
			return res.status(500).json(error);
		} else {
			return res.json(response);
		}
	});
});
```


### Create Front-end Interface

####

Now let's create the front-end. Feel free to set it up however you like.  The only stipulations are that you should have a main route/state where you can see all of the products and an admin route/state where you can create, edit, or delete products.  Don't worry about authentication or protecting your routes at this point.  If you have time, start to set up your front-end application as you think an eCommerce site should be organized.  Introduce some basic styling as well. You could use Bootstrap to help get things going visually.

**TestPoint**: At this point, you should be able to go to the main view and see all of the products that are in your database.  You should also be able to go to the admin view, where you can create, update, or delete products.  As you use this interface, you should be able to get responses from the server, and see the data being changed in the database.

### End Day 1

####

Congrats!  You've just created a skeleton eCommerce application.  Over the next couple of days we will be adding users and orders to our application to make it a full eCommmerce site.

### Copyright

####

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">

## Part II

### Objectives

####

Build a simple backend using Node, Express, and MongoDB and connect it to a simple front-end Angular application.

During this project you will practice using an ORM (Mongoose) to work with your database.  You will also solidify your understanding of models, schemas, middleware, and indexing.

##### Resources
* [Mongoose] (http://mongoosejs.com/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt) or [Bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) for Windows users

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
It is important to keep your code looking clean and neat.  It would be wise for you to outsource the logic from each of your endpoints to a product controller or something similar.  You should also outsource your schema and model declarations to a Product model file.  If you need reminders on how Node's require and export system works, check out [this](http://openmymind.net/2012/2/3/Node-Require-and-Exports/) blog post.

### Connect Front-End

Endpoints are how a front end and back end communicate.  Urls, parameters, queries, and bodies.  That's it.  We didn't change any of those today.  We only changed what was going on underneath.  So our front end should still work!

Make sure that you have an interface where users can view products and add them to their cart.  

**TestPoint**: You should now be able to see all of the products on the front-end.

Once you've finished the front-end, take some time to style your app and make it user-friendly.  Tomorrow you will finish the app by adding a a cart to the user, allow them to check out, and keep track of their current and past orders.
