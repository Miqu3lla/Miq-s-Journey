import User from '../models/user.js'


//user login

export const userLogin = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username: "Miq"})

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if(!username || !password) {
            return res.status(400).json({message: 'Username and password are required'});
        }
        const isMatch = await user.comparePassword(password);
        
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        return res.status(200).json({message: 'Login successful',})
    }catch(err) {
        res.status(500).json({message: 'Server error', details: err.message})
    }
}