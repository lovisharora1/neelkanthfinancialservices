const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    rating: String,
    review: String,
})


module.exports = mongoose.model('review', reviewSchema);