import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define schema for users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure unique usernames
    },
    password: {
        type: String,
        required: true // Store hashed password
    }
}, {timestamps: true}); // Add createdAt and updatedAt fields

// Pre-save hook: Hash password before saving to database
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12); // Hash with salt rounds of 12
    next();
})

// Method to compare entered password with stored hash
userSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

export default mongoose.model('User', userSchema)