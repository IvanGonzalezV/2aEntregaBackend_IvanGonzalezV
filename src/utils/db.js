import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = () => {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;
    return mongoose.connect(uri, { dbName: dbName });
};