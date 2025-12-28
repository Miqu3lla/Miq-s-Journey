import { userLogin, uploadAvatar } from '../controllers/userController.js'
import { Router } from 'express'
import multer from 'multer'; // Multer handles multipart/form-data (file uploads)
const router = Router();

// MULTER STORAGE CONFIGURATION

//diskStorage to save files to local disk
const storage = multer.diskStorage({
    //destination: yeah common sense where u want to save the file

    // Parameters: req (request object), file (uploaded file info), cb (callback)

    destination: (req, file, cb) => {
        //first argument is null for no error and second is the folder path
        cb(null, 'uploads/'); // Save to 'uploads/' folder (must exist)
    },
    
    //filename: to determine the name of the file
    // Parameters: req(request object), file (uploaded file info), cb (callback)
    filename: (req, file, cb) => {
        // naming for the file created
        const safeName = `${file.originalname}`;
        cb(null, safeName); // cb(error, filename)
    }
});

// FILE FILTER (VALIDATION)

// fileFilter: Validate uploaded files before accepting them
// Parameters: req, file, cb
const fileFilter = (req, file, cb) => {
  // Only accept files with image MIME types (image/png, image/jpeg, etc.)
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file (error=null, accept=true)
  } else {
    // Reject non-image files
    cb(new Error('Only images allowed'), false) // (error, accept=false)
  }
};


// CREATE MULTER INSTANCE

// Combine storage, limits, and fileFilter into a multer middleware
const upload = multer({
  storage,                            
  limits: { fileSize: 20 * 1024 * 1024 }, // Max 20MB per file (in bytes)
  fileFilter                            
});

// POST /api/user/login - Authenticate user
router.post('/login', userLogin)

// POST /api/user/avatar - Upload user avatar
// upload.single('avatar') is multer middleware that:
//   1. Parses multipart/form-data from the request
//   2. Looks for a file field named 'avatar' (must match client form field name)
//   3. Saves the file using diskStorage config (to uploads/ folder)
//   4. Attaches file info to req.file for the controller to use
//   5. Runs fileFilter to validate the file is an image
// After multer processes the file, the uploadAvatar controller runs
router.post('/avatar', upload.single('avatar'), uploadAvatar); 
export default router;