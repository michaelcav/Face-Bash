import express from 'express';
const app = express();
// import userRoutes from './routes/users';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(8801, () => {
  console.log('Conectado ao banco de dados');
});
