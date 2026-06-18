import mongoose from 'mongoose';
import crypto from "crypto";


export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(error){
        console.error(error);
        console.error(error.stack);
        process.exit(1);
        console.error(`Error connection to MongoDB: ${error.message}`)
        process.exit(1)
    }
};