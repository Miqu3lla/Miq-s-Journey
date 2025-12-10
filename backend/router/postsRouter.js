import { Router } from 'express'
import { createPost, getAllPosts} from '../controllers/postController.js'

const router = Router();

router.post('/create', createPost)
router.get('/all', getAllPosts)

export default router;