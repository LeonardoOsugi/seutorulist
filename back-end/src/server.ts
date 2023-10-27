import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth-routes';
import { tasksRouter } from './routes/tasks-routes';
dotenv.config();

const app = express();

app.use(cors())
.use(express.json())
.use(authRouter)
.use(tasksRouter)

app.listen(8000, () => console.log('running in port: 8000'));