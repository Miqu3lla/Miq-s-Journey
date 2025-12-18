import mongoose from 'mongoose';

// Define schema for blog posts
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Post title is mandatory
    },
    content: {
        type: String,
        required: true // Post content is mandatory
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    tags: [String] // Array of tag strings
}, {timestamps: true}); // Automatically add createdAt and updatedAt fields

export default mongoose.model('Post', postSchema);