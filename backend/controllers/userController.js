import User from '../models/user.js'

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