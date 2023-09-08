import express from 'express';
const app = express();
import authRoutes from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());

// Configurando CORS com SameSite=None e Secure=true
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

// Utilize o cookieParser para definir cookies com atributos SameSite e Secure
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(8801, () => {
  console.log('Conectado ao banco de dados');
});
