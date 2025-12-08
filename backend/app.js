import express from 'express';
import cors from 'cors';
import postRoutes from './router/posts.js';




const app = express();

app.use(express.json());
app.use(cors());

//routing

app.use('/api/posts', postRoutes);

