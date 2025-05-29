//Import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

//Define schema for orders in the e-commerce system
const orderSchema = new mongoose.Schema({

    //Unique order identifier
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    //ID of the user who placed the order
        user_id: {
        type: String,
        required: true
    },
    //Array of products in the order (each with its own details)
    products: [
        {
            product_id: String,
            quantity: Number,
            price: Number
        }
    ],

    //Total cost of the order
    order_total: Number,

    //Current status of the order
    order_status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'canceled'], //Only these values are allowed
        default: 'pending' //Default state when order is created
    },

    //Timestamp when the order was placed
    order_date: {
        type: Date,
        default: Date.now
    }
});

//Export the schema as a Mongoose model for use in the app
module.exports = mongoose.model('Order', orderSchema);