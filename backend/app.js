import express from 'express';
import cors from 'cors';
import postRoutes from './router/postsRouter.js';
import userRoutes from './router/userRoutes.js';

// Create Express application
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// API Routes
app.use('/api/post', postRoutes); // Post-related endpoints
app.use('/api/user', userRoutes); // User-related endpoints

export default app;

