import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
});

userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword =await bcrypt.hash(this.password,saltRound);
        user.password = hashPassword;
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(enteredPassword){
    try {
        return bcrypt.compare(enteredPassword,this.password);
    } catch (error) {
        console.log(error);
    }
};

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d",
        });
    } catch (error) {
        console.error(error);
    }
}

const User = new mongoose.model("User",userSchema);
export default User;