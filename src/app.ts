
import express from 'express'
import path from 'path'
import session from 'express-session'
import connectDB from './config/database'
import routes from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';

const app = express()

app.set('views',path.join(__dirname,'./views'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,  
    saveUninitialized: false,
  }));
  
  
app.use('/',routes)
app.use('/admin',adminRouter)

  let port = 7000;
  connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on http://localhost:${port}`);
    })
  }) .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
  
  export default app;