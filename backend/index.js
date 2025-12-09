import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';


dotenv.config();

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log('Database connected successfully');

    }catch(err) {
        console.error('Database connection failed', err);
    }
}

const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(process.env.PORT || 5000, () => {
            console.log('Server is running on port', process.env.PORT || 5000);
        })
    }catch(err) {
        console.error('Failed to start server', err);
    }
}

startServer();