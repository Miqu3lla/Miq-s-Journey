import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define schema for users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure unique usernames
    },
    avatar: {
        type: String,
        default: '' // Default avatar URL if none provided
    },
    cloudinaryID: {
        type: String,
        default: null // Default Cloudinary ID if none provided
    },
    password: {
        type: String,
        required: true // Store hashed password
    },
}, {timestamps: true}); // Add createdAt and updatedAt fields

// Pre-save hook: Hash password before saving to database
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return; // Proceed if password is not modified
    this.password = await bcrypt.hash(this.password, 12); // Hash with salt rounds of 12
})

// Method to compare entered password with stored hash
userSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

export default mongoose.model('User', userSchema)