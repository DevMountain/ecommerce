<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

eCommerce Project - Part I
==========================

[Part II](/part-two.md)

[Part III](/part-three.md)

##Objective

Build a simple backend using Node, Express, and MongoDB and connect it to a simple front-end Angular application

During this project, you will solidify your understanding of the MongoDB API.  You will also be able to see how the database fits into the bigger picture of a full application.


## Resources

* [MongoJS] (https://github.com/mafintosh/mongojs)
* [MongoDB Docs] (http://docs.mongodb.org/manual/)


## The Domain

Most companies sell some sort of product and service. For this project we will simulate buidling an eCommerce application.  We will build this project over the course of the next three days.

Today we are going to set up our Node application, set up a basic API, add functionality to do CRUD actions with products, and create a simple front-end interface to be able to create, read, update, and delete products.

## Begin

### Step 1: Set up Express app

Set up your Node app. For this project, use MongoJS to work with MongoDB. In this step, you'll need to:
1. Install the necessary npm packages
2. Require the modules in your server.js file
3. Initiate the connection to MongoDB
4. Create your Express app (no endpoints yet)

**Breakpoint**: At the end of this step, you should be able to initialize your application and connect to MongoDB without errors.

### Step 2: Create Express API

Now you'll create endpoints to create, read, update, and delete products (CRUD).  Feel free to refer back to the Mini Project from earlier today.  It will be a very similar process.

Here are the API endpoints we will need:

`POST /products`

`GET /products`
`GET /products/:id`

`PUT /products/:id`

`DELETE /products/:id`

**Breakpoint**: You should be able to hit each of your endpoints without error and see any parameters or queries that you're sending along the way.  Check by using Postman with `console.log` in your endpoint handlers. *Note*: We haven't hooked up to Mongo yet. This is just to test our Express API.

### Step 3: Connect API to Mongo

Now you'll connect your Express API to Mongo. After each query/action to Mongo is complete, we'll send a response back to the client.

Once again, this is going to be very similar to what we did in the mini-project earlier today.  Feel free to refer back to that code for guidance.

Complete the above Express endpoints so they do exactly what they imply.

**Breakpoint**: At this point you should be able to hit an endpoint and have it touching your database (creating, reading, updating, or deleting a product in Mongo).  Use Postman to hit your endpoints.  You should be able to get a response back in Postman, and be able to see your data being manipulated in your database.  You can check your database via the terminal or [RoboMongo](http://robomongo.org/).

### Step 4: Create Front-end Interface

Now let's create the front-end. Feel free to set it up however you like.  The only stipulations are that you should have a main route/state where you can see all of the products and an admin route/state where you can create, edit, or delete products.  Don't worry about authentication or protecting your routes at this point.  If you have time, start to set up your front-end application as you think an eCommerce site should be organized.  Introduce some basic styling as well. You could use Bootstrap to help get things going visually.

**Breakpoint**: At this point, you should be able to go to the main view and see all of the products that are in your database.  You should also be able to go to the admin view, where you can create, update, or delete products.  As you use this interface, you should be able to get responses from the server, and see the data being changed in the database.

## End Day 1

Congrats!  You've just created a skeleton eCommerce application.  Over the next couple of days we will be adding users and orders to our application to make it a full eCommmerce site.

## Contributions
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
