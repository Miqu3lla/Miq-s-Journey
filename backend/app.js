import express from 'express';
import cors from 'cors';
//import route handlers for posts and users
import postRoutes from './router/postsRouter.js';
import userRoutes from './router/userRoutes.js';

// Create Express application
const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
];

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
    origin: allowedOrigins,
    credentials: true
})); // Enable Cross-Origin Resource Sharing

// API Routes
app.use('/api/post', postRoutes); // Post-related endpoints
app.use('/api/user', userRoutes); // User-related endpoints

import fs from 'fs';
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

export default app;

