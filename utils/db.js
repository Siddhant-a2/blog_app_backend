import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;

async function connectDb(){
    try {
        await mongoose.connect(URI);
        console.log("connection successful to db");
    } catch (error) {
        console.log("database connection failed");
        process.exit(0);
    }
}

export default connectDb;