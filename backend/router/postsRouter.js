import { Router } from 'express'
import { createPost, getAllPosts, editPost} from '../controllers/postController.js'

const router = Router();

// POST /api/post/create - Create a new post
router.post('/create', createPost)

// GET /api/post/all - Fetch all posts
router.get('/all', getAllPosts)
router.put('/edit/:id', editPost);

export default router;