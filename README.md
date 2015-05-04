eCommerce Project - Part I
=================

## Objectives

The purpose of this application is to build a simple backend using Node, Express, and MongoDB and connect it to a simple front-end Angular application.

During this project, you will solidify your understanding of the MongoDB API.  You will also be able to see how the database fits into the bigger picture of a full application.


## Resources

* [MongoJS] (https://github.com/mafintosh/mongojs)
* [MongoDB Docs] (http://docs.mongodb.org/manual/)


## The Domain

Most companies sell some sort of product and service. For this project we will simulate buidling an eCommerce application.  We will build this project over the course of the next three days.

Today we are going to set up our Node application, set up a basic API, add functionality to do CRUD actions with products, and create a simple front-end interface to be able to create, read, update, and delete products.

## Begin

### Step 1: Set up Express app

Set up your Node app. For this project, use MongoJS to work with MongoDB. Feel free to use any other modules or libraries that you feel will help.

**Breakpoint**: You should be able to initialize your application and connect to MongoDB without errors.

### Step 2: Create Express API

Create endpoints to create, read, update, and delete products.  Feel free to refer back to the mini-project from earlier today.  It will be a very similar process

**Breakpoint**: You should be able to hit each of your endpoints without error, and see any parameters or queries that you're sending along the way.  Check with `console.log` in your endpoint handlers. *Note*: We haven't hooked up to Mongo yet.  This is just to test our Express API.

### Step 3: Connect API to Mongo

Connect your Express API to Mongo. After your request to Mongo is done, send a response back to the client.

Once again, this is going to be very similar to what we did in the mini-project earlier today.  Feel free to refer back to that code for guidance.

**Breakpoint**: You should be able to hit an endpoint and have it touching your database (creating, reading, updating, or deleting a product in Mongo).  Use POSTMan to hit your endpoints.  You should be able to get a response back in POSTMan, and be able to see your data being manipulated in your database.  You can check your database via the terminal or RoboMongo.

### Step 4: Create Front-end Interface

Feel free to set up your front-end however you like.  The only stipulations is that you should have a main view where you can see all of the products, and an admin view(s) where you can create, edit, or delete products.  Don't worry about authentication or protecting your routes at this point.  If you have time, start to set up your front-end application as you think an eCommerce site should be organized.  Introduce some basic styling as well.

**Breakpoint**: At this point, you should be able to go to the main view and see all of the products that are in your database.  You should also be able to go to the admin view, where you can create, update, or delete products.  As you use this interface, you should be able to get responses from the server, and see the data being changed in the database.  Use the terminal or RoboMongo to check and make sure your data is being manipulated correctly.

==========

## End Day 1

Congrats!  You've just created a skeleton eCommerce application.  Over the next couple of days we will be adding users and orders to our application to make it a full eCommmerce site.
