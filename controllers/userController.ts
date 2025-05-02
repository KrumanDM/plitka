import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Эта почта уже используется' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: 'Регистрация прошла успешно', user: { email: newUser.email } });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
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
    res.status(500).send({ message: 'Ошибка при авторизации' });
  }
};