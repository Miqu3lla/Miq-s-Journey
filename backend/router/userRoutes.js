import { userLogin } from '../controllers/userController.js'
import { Router } from 'express'

const router = Router();

// POST /api/user/login - Authenticate user
router.post('/login', userLogin)

export default router;