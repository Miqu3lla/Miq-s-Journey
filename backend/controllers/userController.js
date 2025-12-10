import User from '../models/user.js'


//user login

export const userLogin = async (req, res) => {
    try {
        const {username, password} = req.body;
        //find user by username
        const user = await User.findOne({username})
          //if password is missing or username is missing
        if(!username || !password) {
            return res.status(400).json({message: 'Username and password are required'});
        }
        //if user not found
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        //compare password
        const isMatch = await user.comparePassword(password);
        
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        return res.status(200).json({message: 'Login successful',
            userID: user._id,
            username: user.username

        })

    }catch(err) {
        res.status(500).json({message: 'Server error', details: err.message})
    }
}