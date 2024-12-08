import mongoose from 'mongoose';
import Review from './models/reviewModel.js';

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
        process.exit(1); // Exit if database connection fails
    });

// Handler function for the review submission
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, rating, review } = req.body;

        try {
            // Validate the request body
            if (!name || !email || !rating || !review) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            // Save the review to the database
            const newReview = new Review({ name, email, rating, review });
            await newReview.save();

            // Redirect to the confirmation page
            return res.redirect(302, '/formsubmited.html');
        } catch (error) {
            console.error("Error saving review data:", error);

            // Handle database-specific errors
            if (error.name === "MongoNetworkError" || error.name === "MongoTimeoutError") {
                return res.status(503).json({
                    error: "Database connection issue. Please try again later.",
                    details: error.message
                });
            }

            // Handle general server errors
            return res.status(500).json({
                error: "Internal Server Error",
                details: error.message
            });
        }
    } else {
        // Return 405 for unsupported HTTP methods
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
