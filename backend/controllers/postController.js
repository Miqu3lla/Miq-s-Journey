import Post from '../models/postModel.js';
import User from '../models/userModel.js';


// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title,content,tags, author} = req.body;

        const authorID = '6936ab6abcf300c5e5f34021'
        
        const newPost = new Post({
            title,
            content,
            tags,
            author: authorID
        })

        await newPost.save();
        res.status(201).json({message: 'Post created successfully'})

    }catch(err) {
        res.status(500).json({error: 'Failed to create post'});
    }
}