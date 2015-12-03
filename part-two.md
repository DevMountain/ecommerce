<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

eCommerce Project - Part II
===========================

[Part I](/README.md)

[Part III](/part-three.md)

##Objectives

Build a simple backend using Node, Express, and MongoDB and connect it to a simple front-end Angular application.

During this project you will practice using an ORM (Mongoose) to work with your database.  You will also solidify your understanding of models, schemas, middleware, and indexing.

## Resources
* [Mongoose] (http://mongoosejs.com/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt) or [Bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) for Windows users

## The Domain

We'll continue building the eCommerce application.

Today you are going to convert the current Mongo functionality to use Mongoose.  You will be creating a Product model and replacing the current product functionality with that model.

### Step 1: Set up Mongoose

At your application's root folder, run the following command via command line: `npm uninstall --save mongojs`.  This will remove mongojs from your node_modules folder and from your package.json.  Remove or comment out any logic related to MongoJS.

After removing everything MongoJS related, you should be able to start up your server and run it without any errors.

Now that MongoJS is removed, install Mongoose and follow the [instructions](http://mongoosejs.com/docs/connections.html) to connect to MongoDB.  In your code, connect to Mongo after your Express app has started listening.

**Breakpoint**: After setting up Mongoose, you should be able to listen with your Express app and with Mongoose.  The Mongoose connection method can optionally take a callback as the last argument.  That callback sends one argument, `error`.  `console.log` the `error` parameter.  If it's undefined, you've connected correctly. See [this SO](http://stackoverflow.com/questions/6676499/is-there-a-mongoose-connect-error-callback) answer for an example.


### Step 2: Create Product Model

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

Now go to each of your product endpoints and put the necessary Mongoose logic to [Create](http://mongoosejs.com/docs/api.html#model_Model.create), [Read](http://mongoosejs.com/docs/api.html#model_Model.find), [Update](http://mongoosejs.com/docs/api.html#model_Model.update) and [Delete](http://mongoosejs.com/docs/api.html#model_Model.remove) products. Refer to those links for documentation.

*NOTE*: Remember to keep your code looking clean and neat.  It would be wise for you to outsource the logic from each of your endpoints to a product controller or something similar.  You should also outsource your schema and model declarations to a Product model file.  If you need reminders on how Node's require and export system works, check out [this](http://openmymind.net/2012/2/3/Node-Require-and-Exports/) blog post.

**Breakpoint**: At this point you should be able to manipulate the product data via your Express endpoints just like you could when MongoJS was installed.  Test this using POSTMan and the command line or RoboMongo.  After you test the endpoints, go to your front-end product interface (if you were able to build it yesterday) and make sure that the interface still works and manipulates the data like you expect. You may have to update your data models on the front-end to match the model we just set up with Mongoose.

The next step will integrate your backend to the front-end application that you built yesterday.  You will also expand the application to include new functionality.

### Step 3: Connect Front-End

Connect your front-end to your server.  Again, you are free to do this how you like.  

Make sure that you have an interface where users can view products and add them to their cart.  Tomorrow you'll add the actual back-end functionality, but it will give you a head start if you can build the interface today.

**Breakpoint**: You should now be able to see all of the products on the front-end.

Once you've finished the front-end, take some time to style your app and make it user-friendly.  Tomorrow you will finish the app by adding a a cart to the user, allow them to check out, and keep track of their current and past orders.

## Contributions
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
