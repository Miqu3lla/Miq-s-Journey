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
        //check if file is present
        if (!req.file) {
            return res.status(400).json({message: 'No file uploaded'});
        }

        const userID = '6936ab6abcf300c5e5f34021'

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        //delete previous image from cloudinary
        if (user.cloudinaryID) {
            await cloudinary.uploader.destroy(user.cloudinaryID);
        }
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'avatars',
            width: 300,
            height: 300,
            crop: 'fill',
            gravity: 'face',
            quality: 'auto',
            fetch_format: 'auto'
        })

        //delete temporary file from server
        fs.unlinkSync(req.file.path);

        //update user document with new avatar URL and Cloudinary ID
        user.avatar = result.secure_url;
        user.cloudinaryID = result.public_id;

        await user.save();
        
        res.status(200).json({
            message: 'Avatar uploaded successfully',
            avatarURL: user.avatar
        })
    
    }catch (err) {
    res.status(500).json({message: 'Failed to upload avatar', details: err.message});
    }   

}