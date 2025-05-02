import { Order } from '../models/orderModel';
import { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, totalPrice, userEmail, name, phone } = req.body;
    const newOrder = new Order({ items, totalPrice, userEmail, name, phone });
    await newOrder.save();
    res.status(201).send({ message: 'Заказ успешно оформлен' });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка при оформлении заказа' });
  }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ userEmail: email });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка при получении заказов' });
  }
};
export const deleteOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).send({ message: 'Заказ не найден' });
    }

    res.status(200).send({ message: 'Заказ успешно удалён', order: deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Ошибка при удалении заказа' });
  }
};