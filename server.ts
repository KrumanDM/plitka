import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import xssShieldModule from 'xss-shield';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 5002;

// 🧠 Безопасность
app.use(helmet()); // стандартные security-заголовки
// 🔒 CSP защита
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
// 🎯 Настройка CORS-политики
const corsOptions = {
  origin: ['http://localhost:3000', 'https://krumandm.github.io'], // Разрешённые домены
  methods: ['GET', 'POST', 'DELETE'], // Разрешённые методы
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешённые заголовки
  credentials: true, // Разрешить cookie, если нужно
};

app.use(cors(corsOptions));

app.use(express.json());

// 📡 Подключение к БД
mongoose
  .connect('mongodb://127.0.0.1:27017/ProductsBox?directConnection=true')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// 📦 Роутинг
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
