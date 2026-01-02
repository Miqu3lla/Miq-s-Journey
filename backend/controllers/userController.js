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


export const uploadAvatar = async (req, res) =>{
    try {
        //check if file from multer exists
        if (!req.file) {
            return res.status(400).json({message: 'No file uploaded'});
        }

        // get userID from authenticated user (for simplicity, hardcoded here)
        const userID = '6936ab6abcf300c5e5f34021'

        //  Find user in database
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        
       //check if there is a file in the cloudinaryID document then deletes it
        if (user.cloudinaryID) {
            await cloudinary.uploader.destroy(user.cloudinaryID);
        }
        
        // then upload new image to cloudinary
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

        // delete local file that multer putted into uploads folder
        fs.unlinkSync(req.file.path);

        //update the document with avatar URL and cloudinaryID(so we can delete or update later)
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
