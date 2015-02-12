eCommerce Project - Day 1
=================

# Objectives

The start of the eCommerce project for building a fully functional MongoDB, express api for a eCommerce style of application.


## Resources

* [Mongoose] (http://mongoosejs.com/)
* [MongoDB Docs] (http://docs.mongodb.org/manual/)


## The Domain

Most companies sell some sort of product and service. For this project we will simulate buidling an eCommerce application. 

We will start talking about some of the objects that will be needed to be stored into mongo.

### Customers

First, most eCommerce applications have a notion of a Customer.  Whenever you've purchased something from an online store you usually have to provide some information about yourself as a Customer.  Some of the information provided is your name, email address, addresses (billing and shipping), phone numbers (home, work, etc), password, and it's very common to have a mechanism to turn a customer "on" or "off" (soft deleting, think of something like "active" that is a boolean).

### Products

There needs to also be the notion of storing Products or Services.  For this particular part, keep the Product model simple with a Name, Description, Price, and whether it's active or not (sometimes companies will want to turn things on and off).


### Orders

The company will want to store various infomration about an order, for example the customer, the billing address, the shipping address, payment information, subtotal (total of items added to an order), sales tax (for now just use 7%), total (subtotal + total), products added to the order.

### Order Details

An order will need to store the product that is applied to the order and the quantity of how many products the customer has added to the order.  It might be handy to total up these lines (quantity * product price) to ease the subtotal calculation on the order.

## Begin

### Step 1: Set up project and create models for the above description

For this project feel free to use additional frameworks to help with development. 

1. NPM install mongoose
2. Create the models for Moongoose provided the above domain context of the application

#### Customer
1. Add the fields as described above.

#### Product
1. Add the fields as described above.

#### Order
1. Make sure you create a one-to-one relationship between Order and Customer. One of your fields should point to the Customer model, so you know which customer made the order. Each Order should point to one Customer. Since you would always want to keep updated Customer information separate and updated outside of Orders, this would be a reference, not an embedded object (e.g. `myRefField: { type: Mongoose.Schema.Types.ObjectId, ref: 'OtherModel' }`)
2. You should also have an `items` or some similar field, whcih represents a one-to-many relationship between products and the Order. However, this is a different relationship than with Customers. For example, if you have a product placed in an order, and then later on the price of that product changes or is modified, you wouldn't want that to change a present or a past order. The order captures the Product at the time it was created and shouldn't be updated whenever the product changes. Therefore, this will be an embedded Model. There will be many products in a single order, so this field should be an array of Product objects. (Hint: `myEmbeddedField: [MyOtherModel]`).

### Step 2: Enhance your models

1. Add createdAt, updatedAt fields to all your models, making it easy to track the creation and updated timestamps. Use the default of `Date.now` for both of these fields. ([Link](http://mongoosejs.com/docs/2.8.x/docs/defaults.html)).
2. Add a `status` to your Order model. This can be an "enum" field, or a field that enumerates certain possible values. Like so:

`primaryColor: { type: String, enum: ['blue', 'red', 'green'] }`

Make your status field match possible statuses that could be associated with an order.

3. Have your Order model use its own fields for shipping address and billing address, as customers addresses may change over time and we wouldn't want that to affect the status of a current or past order.
4. Add some validation to your fields. Think about which fields would be required vs. optional, which fields need to be unique, min or max values or any other [validations](http://mongoosejs.com/docs/schematypes.html) that would be helpful to make your schemas more robust.
