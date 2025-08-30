import express from 'express';
import { createOrder, getMyOrders, deleteOrderById } from '../controllers/orderController';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

// Создать заказ (только авторизованный пользователь)
router.post('/', verifyToken, createOrder);

// Получить заказы текущего пользователя
router.get('/', verifyToken, getMyOrders);

// Удалить заказ (только свой)
router.delete('/:orderId', verifyToken, deleteOrderById);

export default router;
