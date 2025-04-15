
import { Request, Response } from 'express';
import User from '../models/usermodel';
import bcrypt from 'bcryptjs'
export const getHomePage = (req: Request, res: Response) => {
  res.render('home')
};


export const getLoginPage = (req: Request, res: Response) => {
  res.render('login')
};





export const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      
      return res.redirect('/');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    req.session.user=newUser.name;
    return res.redirect('/home');
  } catch (error) {
    console.error(error);
    return res.redirect('/');
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (email === 'admin@gmail.com' && password === '123456') {
      console.log('Admin login success');
      req.session.admin="admin"
      return res.redirect('/admin/dash');
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.redirect('/');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.redirect('/');
    }
    req.session.user=user.name;
    console.log('User login success');
    return res.redirect('/home');
  } catch (error) {
    console.error('Login error:', error);
    return res.redirect('/');
  }
};



export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.redirect('/'); // ✅ Return here
    }

    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};