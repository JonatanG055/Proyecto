import mongoose from 'mongoose';

// Usa tu URI de MongoDB Atlas aquí
const mongoURI = 'mongodb+srv://jonatan:123@dbd.r6k7h5w.mongodb.net/taskDB?retryWrites=true&w=majority';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

export default connectDB;
