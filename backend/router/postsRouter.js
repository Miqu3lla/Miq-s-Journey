import { Router } from 'express'
import { createPost } from '../controllers/postController.js'

const router = Router();

router.post('/posts', createPost)

export default router;