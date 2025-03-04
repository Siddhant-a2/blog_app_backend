import User from "../models/user-model.js";


async function register(req,res){
    try {
        const data = req.body;
        const {username,password,email} = data;
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(400).json({message:"user already exists."});
        }
        const userCreated = await User.create({username,password,email});
        res.status(200).json({msg:"registration successful",token: await userCreated.generateToken()});

    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}

async function login(req,res){
    try {
        const data =req.body;
        const {email,password} = data;
        const userExist = await User.findOne({email:email});
        if(!userExist){
            return res.status(400).json({message:"invalid credentials"});
        }
        const isPasswordValid = await userExist.comparePassword(password);
        if(isPasswordValid){
            res.status(200).json({message:"login successful",token: await userExist.generateToken()});
        }
        else{
            res.status(400).json({message:"invalid credentials"});
        }
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}


export default {login,register};