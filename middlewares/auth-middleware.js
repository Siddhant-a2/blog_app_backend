import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const authMiddleware = async(req,res,next)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({msg:"unauthorized request"});
    }
    const jwttoken = token.replace("Bearer","").trim();
    try {
        const isVerified= jwt.verify(jwttoken,process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({email:isVerified.email}).select({password:0,});
        req.user = userData;
        // console.log(userData);
        // req.token = token;
        // req.userID = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({msg:"unauthorized request"});
    }
}

export default authMiddleware;