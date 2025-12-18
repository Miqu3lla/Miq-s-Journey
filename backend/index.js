import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log('Database connected successfully');
    }catch(err) {
        console.error('Database connection failed', err);
    }
}

// Initialize server with database connection
const startServer = async () => {
    try {
        // Connect to database first
        await connectDatabase();
        
        // Start Express server
        app.listen(process.env.PORT || 5000, () => {
            console.log('Server is running on port', process.env.PORT || 5000);
        })
    }catch(err) {
        console.error('Failed to start server', err);
    }
}

// Start the application
startServer();