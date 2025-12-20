import Post from '../models/post.js';

/**
 * Create a new post
 * POST /api/post/create
 */
export const createPost = async (req, res) => {
    try {
        // Extract post data from request body
        const { title, content, tags } = req.body;

        // TODO: Replace with actual authenticated user ID
        const authorID = '6936ab6abcf300c5e5f34021'
        
        // Create new post instance
        const newPost = new Post({
            title,
            content,
            tags,
            author: authorID
        })

        // Save to database
        await newPost.save();
        
        // Return success response
        res.status(201).json({message: 'Post created successfully', post: newPost});

    }catch(err) {
        // Handle errors
        res.status(500).json({error: 'Failed to create post', details: err.message});
    }
}

/**
 * Get all posts
 * GET /api/post/all
 */
export const getAllPosts = async (req, res) =>{
    try {
        // Fetch all posts and populate author field with username only
        const posts = await Post.find().populate('author', 'username');
        
        // Check if posts exist
        if (posts.length === 0) {
            return res.status(404).json({message: 'No posts found'});
        }
        
        // Return posts array
        res.status(200).json({posts});
    }catch (err) {
        // Handle errors
        res.status(500).json({error: 'Failed to fetch posts', details: err.message})
    }
}

export const editPost = async (req, res) => {
    // Implementation for editing a post
    const postID = req.params.id;
    const { title, content, tags} = req.body;
    
    try {
        const updatedPost = await Post.findByIdAndUpdate(postID, {
            title,
            content,
            tags
        }, {new: true});


         if (!updatedPost) {
        return res.status(404).json({message: 'Post not found'})
        }

        res.status(200).json({message: 'Post updated successfully', post: updatedPost})

        }catch (err) {
        res.status(500).json({error: 'Failed to edit post', details: err.message
        })
    }
}

export const deletePost = async (req, res) => {
    // Implementation for deleting a post

    const postID = req.params.id;

    try {
        const deletedPost = await Post.findByIdAndDelete(postID);
        
        if (!deletedPost) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json({message: 'Post deleted successfully'});
    }catch (err) {
        res.status(500).json({error: 'Failed to delete post', details: err.message});
    }
}