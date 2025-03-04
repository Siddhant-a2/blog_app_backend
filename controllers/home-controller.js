import Blog from "../models/blog-model.js";
import User from "../models/user-model.js";

async function home(req,res){
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = 10; // 10 blogs per page
    const skip = (page - 1) * limit;

    try {
        const blogs = await Blog.find().sort({like:-1}).skip(skip).limit(limit);
        const totalBlogs = await Blog.countDocuments(); // Get total blog count
        res.json({
            blogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createPost(req,res){
    try {
        const data = req.body;
        const {title,username,summary,blog,email} = data;
        const result = await Blog.create({title:title,username:username,summary:summary,blog:blog,email:email});
        res.status(200).json({msg:"Blog is posted",blog:result});
    } catch (error) {
        res.status(500).json({error:err.message});
        // console.log("blog posting error");
    }
}

async function likeDisLike(req,res) {
    try {
        const { id } = req.params;
        const { email } = req.body; // Get email from request body

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const likedBy = blog.likedBy || [];
        const isLiked = likedBy.includes(email);

        if (isLiked) {
            // If already liked, remove from likedBy array and decrease like count
            blog.likedBy = likedBy.filter(userEmail => userEmail !== email);
            blog.like = Math.max(0, blog.like - 1); // Ensure likes don't go below 0
        } else {
            // If not liked, add email to likedBy array and increase like count
            blog.likedBy.push(email);
            blog.like += 1;
        }

        await blog.save(); // Save changes

        res.status(200).json({
            message: isLiked ? "Post disliked" : "Post liked",
            likeCount: blog.like,
            likedBy: blog.likedBy,
        });
    } catch (error) {
        console.error("Like/Dislike Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function readBlog(req,res){
    try {
        const blog = await Blog.findById(req.params.id);
        // console.log(blog);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteBlog(req,res){
    try {
        const { id } = req.params; // Get blog ID from request params
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json({ message: "Blog deleted successfully", deletedBlog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function search(req,res){
    const {query,type} = req.query;
    if(type == "person"){
        try {
            const blogs = await Blog.find({username: {$regex:query, $options:"i"}});
            // const user = await User.find({username: {$regex:query,$options:"i"}});
            res.status(200).json({blogs:blogs});
        } catch (error) {
            console.log("search by authorname error");
        }
    }
    else if(type == "title"){
        try {
            const blogs = await Blog.find({title:{$regex:query, $options:"i"}});
            res.status(200).json({blogs:blogs});
        } catch (error) {
            console.log("search by title error");
        }
    }
    else{
        res.status(404).json({msg:"incorrect search value"});
    }
}

export default {home,createPost,likeDisLike,readBlog,deleteBlog,search};