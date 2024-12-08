import mongoose from 'mongoose';

// Define the schema for user appointments
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenum: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    msg: { type: String, default: '' },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model as default
export default User;
