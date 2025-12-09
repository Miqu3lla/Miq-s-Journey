import { userLogin } from '../controllers/userController.js'
import { Router } from 'express'

const router = Router();


router.post('/login', userLogin)

export default router;