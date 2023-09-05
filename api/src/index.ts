import express from 'express';
import mysql from 'mysql';
const app = express();
import userRoutes from './routes/users';
import authRoutes from './routes/auth';

//middleware
app.use(express.json)

app.use('/api/auth', authRoutes)

app.listen(8800, ()=> {
  console.log('conected db')
})