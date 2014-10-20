eCommerce Project - Day 1
=================

# Objectives

The start of the eCommerce project for building a fully functional MongoDB, express api for a eCommerce style of application.


## Resources
----

* [Mongoose] (https://github.com/jaredhanson/passport-github)
* [MongoDB Docs] (http://docs.mongodb.org/manual/)


## The domain
----

Most of the time in industry you are handed pretty vague requirements and expected to come up with a solution basedo on those requirements, luckily, we'll do the best to clarify what it is we are trying to build.  

Most companies sell some sort of product and service. For this 3 day lab we will simulate buidling an eCommerce application. 

We will start talking about some of the objects that will be needed to be stored into mongo.

### Customers
----

First of most all eCommerce applications has a notion of a Customer.  Whenever you've purchased something from an online store you usually have to provide some information about you as a Customer.  Some of the information provided is your name, email address, addresses(billing and shipping), phone numbers (home, work, etc), password, and it's very common to have a way to turn a customer on or off (soft deleting, thing of something like active that is a boolean).


### Products
----

There needs to also be notion of storing Products or Services.  For this particular part, keep the Product model simple with a Name, Description, Price, and whether it's active or not (somtimes companies will want to turn things on and off).


### Orders
----

The company will want to store various infomration about an order, for example the customer, the billing address, the shipping address, payment information, subtotal (total of items added to an order), sales tax (for now just use 7%), total (subtotal + total), products added to the order.

### Order Details

An order will need to store the product that is applied to the order and the quantity of how many products the customer has added to the order.  It might be handy to total up these lines (quantity * product price) to ease the subtotal calculation on the order.


## Create a node project and create models for the above domain
----

For this project feel free to use additional frameworks to help with development. 

1. NPM install mongoose
2. Create the models for Moongoose provided the above domain context of the application

Feel free to add any additional information to the models that will ease or enhance your solution




