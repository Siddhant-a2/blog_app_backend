import Blog from "../models/blog-model.js";
import User from "../models/user-model.js";

async function authorProfile(req,res){
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = 10; // 10 blogs per page
    const skip = (page - 1) * limit;
    try {
        const {email} = req.params;
        const blogs = await Blog.find({email:email}).sort({like:-1}).skip(skip).limit(limit);
        const totalBlogs = await Blog.countDocuments({email:email}); // Get total blog count
        const user = await User.find({email:email});
        res.json({
            blogs,
            user,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page
        });
        // res.status(200).json({blogs:blogs,user:user});
    } catch (error) {
        console.log("profile catching error");
    }
    
}

async function user(req,res){
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.log("user data error");
    }
}

export default {authorProfile,user};