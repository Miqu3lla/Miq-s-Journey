import { Router } from 'express'
//import controller functions for posts
import { createPost, getAllPosts, editPost, deletePost} from '../controllers/postController.js'

const router = Router();

router.post('/create', createPost)
router.get('/all', getAllPosts)
router.put('/edit/:id', editPost);
router.delete('/delete/:id', deletePost);

export default router;