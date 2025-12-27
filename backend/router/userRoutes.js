import { userLogin, uploadAvatar } from '../controllers/userController.js'
import { Router } from 'express'
import multer from 'multer';
const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // make sure this folder exists
    },
    filename: (req, file, cb) => {
        const safeName = `${Date.now()}-${file.originalname}`;
        cb(null, safeName);
    }
});

const fileFilter = (req, file, cb) => {
  // accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
     cb(new Error('Only images allowed'), false)
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter
});

// POST /api/user/login - Authenticate user
router.post('/login', userLogin)
router.post('/avatar', upload.single('avatar'), uploadAvatar); 
export default router;