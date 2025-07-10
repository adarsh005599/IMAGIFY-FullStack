import express from 'express';
import  generateImage  from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js'; // middleware that verifies JWT token

const imageRouter = express.Router();

// Route: POST /api/image/generate-image
imageRouter.post('/generate-image', userAuth, generateImage);

export default imageRouter;
