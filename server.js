import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ProductsBox?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4', {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Определение схемы и модели
const decksSchema = new mongoose.Schema({
  img: String,
  title: String,
  star: String,
  reviews: String,
  prevPrice: String,
  newPrice: String,
  company: String,
  color: String,
  category: String,
  size: String,
  year: String,
});
const trucksSchema = new mongoose.Schema({
  img: String,
  title: String,
  prevPrice: String,
  newPrice: String,
  company: String,
  color: String,
  category: String,
  size: String,
  year: String,
});
const complitesSchema = new mongoose.Schema({
  img: String,
  title: String,
  prevPrice: String,
  newPrice: String,
  company: String,
  color: String,
  category: String,
  size: String,
  year: String,
});
const Decks = mongoose.model('Decks', decksSchema, 'Products');
const Trucks = mongoose.model('Trucks', trucksSchema, 'ProductsTrucks');
const Complites = mongoose.model('Complites', complitesSchema, 'ProductsComplites');
// Маршрут для добавления данных
app.post('/api/data', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: 'No data provided' });
      return;
    }
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Маршрут для получения данных
app.get('/api/decks', async (req, res) => {
  try {
    const decks = await Decks.find();
    res.status(200).send(decks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/trucks', async (req, res) => {
  try {
    const trucks = await Trucks.find();
    res.status(200).send(trucks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/complites', async (req, res) => {
  try {
    const complites = await Complites.find();
    res.status(200).send(complites);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Определение схемы и модели пользователя
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User ', userSchema, 'Users');

// Маршрут для регистрации пользователя
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка на существование пользователя с таким email
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).send({ message: 'Эта почта уже используется' });
    }

    // Хеширование пароля и создание нового пользователя
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ email, password: hashedPassword });
    await newUser .save();
    
    // Отправка сообщения об успешной регистрации
    res.status(201).send({ message: 'Регистрация прошла успешно', user: { email: newUser .email } });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});




const orderSchema = new mongoose.Schema({
  items: Array, // Массив с элементами заказа
  totalPrice: Number, // Общая цена заказа
  userEmail: String, // Добавьте это поле
  name: String, // Имя пользователя
  phone: String, // Телефон пользователя
  createdAt: { type: Date, default: Date.now }, // Дата создания заказа
});

const Order = mongoose.model('Order', orderSchema, 'Orders'); // 'Orders' - имя коллекции

//Маршрут для обработки заказа
app.post('/api/order', async (req, res) => {
  try {
    const { items, totalPrice, userEmail, name, phone } = req.body;

    // Создайте новый заказ
    const newOrder = new Order({ items, totalPrice, userEmail, name, phone });
    await newOrder.save();

    // Отправьте ответ клиенту
    res.status(201).send({ message: 'Заказ успешно оформлен' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Ошибка при оформлении заказа' });
  }
});



// Маршрут для авторизации пользователя
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Неверный email или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Неверный email или пароль' });
    }

    res.status(200).send({ email: user.email, id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Ошибка при авторизации' });
  }
});

// Маршрут для получения заказов по email
app.get('/api/orders/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ userEmail: email });
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Ошибка при получении заказов' });
  }
});

app.delete('/api/orders/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await Order.findByIdAndDelete(orderId);
    res.status(200).send({ message: 'Заказ удален' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Ошибка при удалении заказа' });
  }
});