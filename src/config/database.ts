import mongoose from 'mongoose';

let url = "mongodb+srv://AmruthShyju:Amruth%408055@cluster0.zoh4nio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB Connected`);
        return conn;
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
};

export default connectDB;
