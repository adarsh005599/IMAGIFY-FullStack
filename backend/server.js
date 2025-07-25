import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

// CORS config for production (Render frontend)
app.use(cors({
  
origin: [
    'https://imagify-fullstack-frontend.onrender.com', // live frontend
    'http://localhost:5173'                             // local dev frontend
  ],
  credentials: true,
}));

// Middleware
app.use(express.json());

// DB Connection
await connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Root test route
app.get('/', (req, res) => {
  res.send("API is working!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
