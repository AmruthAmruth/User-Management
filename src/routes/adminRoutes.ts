import express from 'express';
import { createUser, deleteUser, getAdminDashBored, updateUser } from '../controllers/admincontroller';
import { adminAuth } from '../config/middileware';
import { logoutUser } from '../controllers/usercontroller';

const adminRouter = express.Router();
adminRouter.get('/dash', getAdminDashBored)
adminRouter.get('/user/delete/:id',deleteUser);
adminRouter.post('/user/update',updateUser)
adminRouter.post('/user/add',createUser)
adminRouter.post('/logout',logoutUser)
export default adminRouter;