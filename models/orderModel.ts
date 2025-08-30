import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOrderItem {
  title: string;
  newPrice: string;
  img: string;
  company: string;
  color: string;
  quantity: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId; // ссылка на пользователя
  items: IOrderItem[];
  totalPrice: number;
  userEmail: string;
  name: string;
  phone: string;
  createdAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    title: { type: String, required: true },
    newPrice: { type: String, required: true },
    img: { type: String, required: true },
    company: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false } // чтобы не создавать отдельный _id для каждого элемента массива
);

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], required: true }, // массив с конкретной схемой
    totalPrice: { type: Number, required: true },
    userEmail: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema, 'Orders');
