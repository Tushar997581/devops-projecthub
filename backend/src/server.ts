import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import healthRouter from './routes/healthRoute.js';
import authRouter from './routes/authRoute.js';
import projectRouter from './routes/projectRoute.js';
import taskRouter from './routes/taskRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import { errorHandler } from './middleware/errorHandler.js';
import { env } from './config/env.js';

dotenv.config();

const app = express();
const port = env.port;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
