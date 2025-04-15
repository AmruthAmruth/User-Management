import express from 'express';
import { getHomePage, getLoginPage, loginUser, logoutUser, signupUser } from '../controllers/usercontroller'; 
import { userAuth } from '../config/middileware';

const router = express.Router();

router.get('/', getLoginPage); 
router.get('/home',getHomePage);
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser)
export default router; 