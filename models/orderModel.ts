import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: Array,
  totalPrice: Number,
  userEmail: String,
  name: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model('Order', orderSchema, 'Orders');

