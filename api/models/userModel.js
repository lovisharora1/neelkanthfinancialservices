const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phonenum: String,
    date: String,
    time: String,
    msg: String,
    rating: String,
    review: String,
})


module.exports = mongoose.model('appointments', userSchema);