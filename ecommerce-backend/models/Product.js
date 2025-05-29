//Import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

//Define the Product schema used to store product listings
const ProductSchema = new mongoose.Schema({

    //Unique identifier for the product
    product_id: {
        type: String,
        required: true,
        unique: true
    },
     //Name of the product
    product_name: {
        type: String,
        required: true
    },

    //Price of the product
    product_price: Number,

    //Category the product belongs to
    product_category: String,

    //Quantity of product in stock
    product_stock: Number,

    //Average product rating (default is 0)
    product_rating: {
        type: Number,
        default: 0
    },

    //ID of the seller or provider offering the product
    provider_id: String,

    //Array of image filenames or URLs related to the product
    product_images: [String],

    //Date the product was added or produced
    product_produced: {
        type: Date,
        default: Date.now
    }
});

//Export the schema as a Mongoose model for use in routes and controllers
module.exports = mongoose.model('Product', ProductSchema);