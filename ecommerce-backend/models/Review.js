//Import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

//Define the schema for customer product reviews
const reviewSchema = new mongoose.Schema({

    //Unique identifier for the review
    review_id: {
        type: String,
        required: true,
        unique: true
    },
    //ID of the product being reviewed
    product_id: {
        type: String,
        required: true
    },
    //ID of the user who submitted the review
    user_id: {
        type: String,
        required: true
    },
    //Star rating for the product (must be between 1 and 5)
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    //Optional text comment accompanying the review
    comment: String,

    //Timestamp for when the review was created
        created_at: {
        type: Date,
        default: Date.now
  }
});

//Export the schema as a Mongoose model for use throughout the app
module.exports = mongoose.model('Review', reviewSchema);