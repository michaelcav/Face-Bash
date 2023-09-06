import express from 'express';
const app = express();

// import userRoutes from './routes/users';
import authRoutes from './routes/auth.js';

//middleware
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(8801, () => {
  console.log('Conectado ao banco de dados');
});
