import express from 'express';
const app = express();
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use("/api/posts", postRoutes);

app.listen(8801, () => {
  console.log('Conectado ao banco de dados');
});
