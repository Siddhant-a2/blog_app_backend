import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    summary:{
        type:String,
        require:true,
    },
    blog:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    like:{
        type:Number,
        default:0,
    },
    likedBy:{
        type:[String],
    }
})

const Blog = new mongoose.model("Blog",blogSchema);
export default Blog;