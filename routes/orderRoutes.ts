import express from 'express';
import { createOrder, getOrdersByEmail, deleteOrderById } from '../controllers/orderController';


const router = express.Router();

router.post('/', createOrder);
router.get('/:email', getOrdersByEmail);
router.delete('/:orderId', deleteOrderById);

export default router;
