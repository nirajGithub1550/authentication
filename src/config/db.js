import mongoose from 'mongoose';

import dns from 'node:dns';

// Force Node.js to use Google's Public DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDB = async () => {
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);    
    }
}

