
import { Request, Response } from 'express';
import User from '../models/usermodel';
import bcrypt from 'bcryptjs'
export const getAdminDashBored =async(req: Request, res: Response) => {
    console.log("Admin dash");
    let users = await User.find()
    console.log(users);
    
    res.render('admindash',{users})
  };

  
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
  
      await User.findByIdAndDelete(userId);
  
      return res.redirect('/admin/dash'); 
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.redirect('/admin/dash'); 
    }
  };


  export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password,id } = req.body;
      const userId = id
 
  console.log("Updating");
  
      const updatedFields: { name?: string; email?: string; password?: string } = {
        name,
        email,
      };
  
      if (password && password.trim() !== '') {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedFields.password = hashedPassword;
      }
  
      await User.findByIdAndUpdate(userId, updatedFields);
  
      res.redirect('/admin/dash');
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Server Error');
    }
  };



  export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.redirect('/admin/dash');
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.redirect('/admin/dash'); 
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();

  
      res.redirect('/admin/dash'); 
    } catch (error) {
      console.error('Error creating user:', error);
      res.redirect('/admin/dash'); 
    }
  };

