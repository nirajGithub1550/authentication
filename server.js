import dotenv from 'dotenv';
import express from 'express';
import app from './src/app.js';
import {connectDB} from './src/config/db.js';
// import userRoutes from './src/routes/userRoutes.js';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})