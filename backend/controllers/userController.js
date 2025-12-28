import User from '../models/user.js';
import cloudinary from '../config/Cloudinary.js';
import fs from 'fs';

/**
 * User login authentication
 * POST /api/user/login
*/

export const userLogin = async (req, res) => {
    try {
        // Extract credentials from request body
        const {username, password} = req.body;
        
        // Validate required fields
        if(!username || !password) {
            return res.status(400).json({message: 'Username and password are required'});
        }
        
        // Find user by username
        const user = await User.findOne({username})
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        
        // Verify password using bcrypt comparison
        const isMatch = await user.comparePassword(password);
        
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        
        // Return success with user data
        return res.status(200).json({
            message: 'Login successful',
            userID: user._id,
            username: user.username
        })

    }catch(err) {
        // Handle server errors
        res.status(500).json({message: 'Server error', details: err.message})
    }
}

/**
 * Upload user avatar to Cloudinary
 * POST /api/user/avatar
 * 
 * Flow:
 * 1. Multer saves file to local disk (uploads/ folder)
 * 2. Controller uploads file from disk to Cloudinary CDN
 * 3. Controller deletes local file (cleanup)
 * 4. Controller updates user record with Cloudinary URL
 * 5. Frontend displays image using Cloudinary URL
 */
export const uploadAvatar = async (req, res) =>{
    try {
        // STEP 1: Verify multer processed a file
        // req.file is populated by multer middleware (upload.single('avatar'))
        // req.file contains: { path, filename, originalname, mimetype, size, etc. }
        if (!req.file) {
            return res.status(400).json({message: 'No file uploaded'});
        }

        // STEP 2: Get user ID (hardcoded for now - should use req.params.id or req.user.id)
        const userID = '6936ab6abcf300c5e5f34021'

        // STEP 3: Find user in database
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        
        // STEP 4: Delete old avatar from Cloudinary (if exists)
        // user.cloudinaryID is the public_id from the previous upload
        // This prevents accumulating old images in your Cloudinary account
        if (user.cloudinaryID) {
            await cloudinary.uploader.destroy(user.cloudinaryID);
        }
        
        // STEP 5: Upload new image to Cloudinary
        // req.file.path is the local file path (e.g., "uploads/1703721234567-avatar.png")
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'avatars',        // Organize uploads in Cloudinary 'avatars' folder
            width: 300,               
            height: 300,              
            crop: 'fill',             // Fill the dimensions (may crop to fit)
            gravity: 'face',          // Focus on face when cropping (Cloudinary detects faces)
            quality: 'auto',          
            fetch_format: 'auto'      //optimize format (webp, jpeg, etc.) based on browser support
        })
        
        // result contains: { secure_url, public_id, width, height, format, etc. }

        // STEP 6: Delete temporary file from local disk
        // The file is no longer needed since it's now on Cloudinary CDN
        // fs.unlinkSync() synchronously removes the file
        fs.unlinkSync(req.file.path);

        // STEP 7: Update user document with Cloudinary URLs
        user.avatar = result.secure_url;    // HTTPS URL to display image (e.g., https://res.cloudinary.com/...)
        user.cloudinaryID = result.public_id; // Cloudinary ID to delete/update later (e.g., "avatars/abc123")

        // STEP 8: Save updated user to database
        await user.save();
        
        // STEP 9: Return success response with Cloudinary URL
        res.status(200).json({
            message: 'Avatar uploaded successfully',
            avatarURL: user.avatar  // Frontend uses this URL in <img src="..." />
        })
    
    }catch (err) {
        // If any step fails, return error
        // Common errors: Cloudinary credentials invalid, network issues, file system errors
        res.status(500).json({message: 'Failed to upload avatar', details: err.message});
    }   

}