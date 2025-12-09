import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

    }, {timestamps: true});

    
    
    //hashing password before saving user
    userSchema.pre('save', async function(next) {
        if(this.isModified('password') ) return next();
        this.password = await bcrypt.hash(this.password, 12);
        next();
    })
    userSchema.methods.comparePassword = async function(userPassword) {
        return await bcrypt.compare(userPassword, this.password);
    }
export default mongoose.model('User', userSchema)