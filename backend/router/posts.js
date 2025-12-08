import router from 'express'
import { createPost } from '../controllers/postController'

const router = router();

router.post('/posts', createPost)