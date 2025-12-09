import express from 'express';
import cors from 'cors';
import postRoutes from './router/postsRouter.js';
import userRoutes from './router/userRoutes.js';



const app = express();

app.use(express.json());
app.use(cors());

//routing

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);



export default app;

