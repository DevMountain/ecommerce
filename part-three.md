<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

eCommerce Project - Part III
============================

[Part I](/README.md)

[Part II](/part-two.md)

## Objective

Build a simple backend using Node, Express, and MongoDB and connect it to a simple front-end Angular application.

During this project you will use Mongoose to create relationships between multiple sets of data.

## Resources
* [Mongoose] (http://mongoosejs.com/)

## The Domain

Today you are going to create two new schemas, one for Orders and one for Carts.  You are also going to create a relationship between Carts and Products using a reference, a relationship betwen Orders and Products using embedding, and a relationship between Orders and Users using reference.

### Step 1: Create new Schemas: Orders & Carts

Create a schema for orders.  Add whatever fields you feel it might need.  *Orders should have two special relationships: a reference to a user, and embedded products.* Create the Order model with your schema and export it.

Create a schema for carts.  Add whatever fields you feel it might need.  *Carts should have one special relationship: a reference to products.*

Once you've created your schema, export it (NOT as a model).  Then go to your User model and use the cart schema for the User's cart field.

*Note*:  This may seem confusing.  Technically, you could just define the new fields in the User's schema.  But it's important to know that a schema is just a pattern or blueprint to follow.  It can be used in multiple models.  For clarification on the difference between a schema and a model see [this SO post](http://stackoverflow.com/questions/22950282/schema-vs-model).

**Breakpoint**: You should be able to spin up your server without any errors.  You should also be able to test that your new Order model and new cart schema are working.  You can either create a dummy endpoint and hook it up to your models, or write a script in your server.js file and run it on server load.  Test and make sure that you can create new Orders and add items to a user's cart.

If you've passed this breakpoint, then you have essentially set up your relationships.  Good work!  Let's walk through how you are going to work with these relationships.

### Step 2: Create Endpoints

Create the following Express endpoints:
 * **POST** `/api/order`
 * **GET** `/api/order`
 * **POST** `/api/cart`
 * **PUT** `/api/cart`

### Cart

With the cart POST endpoint, you will expect a request query of `user_id` that will take the id of a user.  In the handler, get the user.  The request will have a JSON of the product that is being added to the cart, including a quantity.  Add that item to the user's cart, then save the user.

*Note*: At some point you may realize that the models you created earlier are not complete enough for what we're trying to do.  Feel free to go back and change your models to make them work.

The cart PUT endpoint will be similar, but is intended to change the quantity of a particular item in the cart. If the new quantity is 0, simply remove the item from the cart altogether.

*Note*:  You'll see that no GET endpoint was created.  Instead, we will simply send the entire cart whenever the user is retrieved.  Look at Mongoose's [.populate()](http://mongoosejs.com/docs/populate.html) method.  Wheverver you are getting your user, add the .populate to populate your cart before sending it to the client.

### Order

With the order POST endpoint, send a request query of `user_id` that will include the id a user.  In the handler, get the user's cart and create a new order with the products in the cart.  Make sure you use the user's id to reference from the order to the user. After successfully creating the order, empty the user's cart.

**Breakpoint**:  Create a new user and add several items to their cart.  Then take their id and hit the `/api/order` endpoint with it (via Postman or your Angular application).  It should create a a new order and empty the user's cart.  Use RoboMongo or the command line to check the data.

With the order GET endpoint, simply accept a reqeust query of whatever orders you're searching for.  For example, if you were looking for all orders placed on a certain day, the URL might look like this: `/api/order?date=07/09/16`.  If you were looking for a specific user's orders, it might look like so: `/api/order?user=o09f6d8fnn7df7n9joj`.  Look at Mongoose's [query](http://mongoosejs.com/docs/queries.html) documentation if you need some examples.

**Breakpoint**: You should be able to test your order GET endpoint via Postman or your app.  Try a few different queries.  The most important one is the user query.

If you've passed this last breakpoint, then  you've finished the backend of your application. Well done. Now it's simply a matter of tying in your endpoints with your Angular application.

### Step 3: Connect front-end

Take some time to connect your Express API to your Angular application.  You have a lot of freedom in how you do that.  Make sure that you have the ability to add items to a user's cart (you might create a dropdown menu to select a user, since there is no authentication yet), view the cart, create a new order, and view that order.  If you finish that with ample time, add some extra styling and/or functionality.

**Breakpoint**: You should be able to add items to a user's cart, view the cart, create and view orders.

If you pass that breakpoint, then congrats!  You've just built your first full-stack application!  What you've just done is the basics of building any CRUD app.

## Contributions
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
