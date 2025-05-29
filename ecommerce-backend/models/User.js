//Import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

//Define the schema for users (buyers or sellers)
const userSchema  = new mongoose.Schema({

    //Unique identifier for the user
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    //Full name of the user
    user_name: {
        type: String,
        required: true
    },
    //Email address of the user (must be unique)
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    //User role (either buyer or seller)
    user_role: {
        type: String,
        enum: ['buyer', 'seller'], // Only these two values allowed
        default: 'buyer' // Default role if not specified
    },
    //User address information
    user_address: {
        city: String,
        country: String
    },
    //Timestamp for when the user was created
    created_at: {
        type: Date,
        default: Date.now
    }
});

//Export the schema as a Mongoose model
module.exports = mongoose.model('User', userSchema);