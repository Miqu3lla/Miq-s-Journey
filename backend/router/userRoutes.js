import { userLogin, uploadAvatar } from '../controllers/userController.js'
import { Router } from 'express'
import { upload } from '../middleware/upload.js'

const router = Router();

router.post('/login', userLogin)
router.post('/avatar', upload.single('avatar'), uploadAvatar); 
export default router;