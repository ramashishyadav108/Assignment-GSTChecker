import dotenv from 'dotenv';
dotenv.config({ override: true });

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import gstRoutes from './routes/gstRoutes.js';

const app = express();

const ALLOWED_ORIGINS = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (server-to-server, curl, etc.)
      if (!origin) return cb(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      cb(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', gstRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Connect once and cache the connection (important for serverless)
let isConnected = false;
export const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

export default app;
