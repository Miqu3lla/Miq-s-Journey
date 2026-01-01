//multer middleware for handling file uploads
import multer from 'multer';

//configure multer for file destination and file naming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const safeName = `${Date.now()}-${file.originalname}`;
        cb(null, safeName);
    }
});
//file filter to only accept image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images allowed'), false);
    }
};

//export multer upload middleware
export const upload = multer({
    storage, //runs the storage configuration first
    limits: { fileSize: 20 * 1024 * 1024 }, //20mb limit
    fileFilter //runs the file filter function
});