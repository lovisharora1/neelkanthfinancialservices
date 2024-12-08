import mongoose from 'mongoose';
import User from './models/userModel.js';

// Connect to MongoDB with enhanced configuration
mongoose.connect(process.env.MONGODB_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, 
    socketTimeoutMS: 45000,  
    maxPoolSize: 10,         
    minPoolSize: 5           
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1); // Exit if unable to connect to the database
    });

// Handler function for the POST request
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phonenum, date, time, msg } = req.body;

        try {
            // Validate required fields
            if (!name || !email || !phonenum || !date || !time) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            // Save user details in the database
            const user = new User({ name, email, phonenum, date, time, msg });
            await user.save();

            // Redirect to the confirmation page
            return res.redirect(302, '/formsubmited.html');
        } catch (error) {
            console.error("Error saving user data:", error);

            // Handle MongoDB-specific errors
            if (error.name === "MongoNetworkError" || error.name === "MongoTimeoutError") {
                return res.status(503).json({
                    error: "Database connection issue. Please try again later.",
                    details: error.message
                });
            }

            // General internal server error response
            return res.status(500).json({
                error: "Internal Server Error",
                details: error.message
            });
        }
    } else {
        // Handle unsupported HTTP methods
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
