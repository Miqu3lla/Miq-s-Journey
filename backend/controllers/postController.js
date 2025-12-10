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

//get all posts

export const getAllPosts = async (req, res) =>{
    try {
        //find all posts and populate author field with username
        const posts = await Post.find().populate('author', 'username');
        //ok status with posts data
        if (posts.length === 0) {
            return res.status(404).json({message: 'No posts found'});
        }
        res.status(200).json({posts});
    }catch (err) {
        res.status(500).json({error: 'Failed to fetch posts', details: err.message})
    }
}