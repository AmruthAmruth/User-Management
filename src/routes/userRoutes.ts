import express from 'express';
import { getLoginPage } from '../controllers/usercontroller'; // adjust path if different

const router = express.Router();

router.get('/', getLoginPage); 
export default router;