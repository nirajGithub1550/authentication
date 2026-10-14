import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import {AppError} from './utils/AppError.js';
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
