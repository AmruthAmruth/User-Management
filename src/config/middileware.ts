
import { Request, Response,NextFunction } from 'express';

export const userAuth=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.session.user){
        res.redirect('/')
    }else{
        res.redirect('/home')
    }
    next()
}  

export const adminAuth=(req:Request,res:Response,next:NextFunction)=>{
    if(req.session.admin){
res.redirect("/admin/dash")
    }else{
        res.redirect('/')
    }
    next()
}