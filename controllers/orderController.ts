import { Response } from 'express';
import { Order } from '../models/orderModel';
import { AuthRequest } from '../middlewares/verifyToken';
import mongoose from 'mongoose';

// Создание заказа
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { items, totalPrice, name, phone } = req.body;

    const order = new Order({
      user: req.user!.id,              // из токена
      userEmail: req.user!.email,      // из токена
      items,
      totalPrice,
      name,
      phone,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании заказа' });
  }
};


export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user!.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заказов' });
  }
};


// Удаление заказа (только своего)
export const deleteOrderById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Некорректный ID заказа' });
    }

    const order = await Order.findOne({ _id: orderId, user: req.user.id });

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден или нет доступа' });
    }

    await order.deleteOne();
    res.status(200).json({ message: 'Заказ успешно удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении заказа' });
  }
};

