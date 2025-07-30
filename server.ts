import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';
import { applySecurityMiddleware } from './securityMiddleware';
import { corsMiddleware } from './corsMiddleware';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(corsMiddleware);

app.use(express.json());

applySecurityMiddleware(app);

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
