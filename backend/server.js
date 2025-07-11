import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

// ✅ Allowed Frontend Origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://imagify-fullstack-frontend.onrender.com'
];

// ✅ CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Not allowed by server'));
    }
  },
  credentials: true,
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Connect MongoDB
await connectDB();

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('API is working!');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
