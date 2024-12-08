import mongoose from 'mongoose';

// Define the schema for customer reviews
const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
});

// Create the Review model
const Review = mongoose.model('Review', reviewSchema);

// Export the model as default
export default Review;
