import express from 'express'
import { registerUser, loginUser , userCredits} from '../controllers/userController.js';


import userAuth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/credits', userAuth, userCredits); // secure this with token

export default router;
