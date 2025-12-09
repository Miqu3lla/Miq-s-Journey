import Post from '../models/post.js';


// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title,content,tags} = req.body;

        const authorID = '6936ab6abcf300c5e5f34021'
        
        const newPost = new Post({
            title,
            content,
            tags,
            author: authorID
        })

        await newPost.save();
        res.status(201).json({message: 'Post created successfully', post: newPost});

    }catch(err) {
        res.status(500).json({error: 'Failed to create post', details: err.message});
    }
}