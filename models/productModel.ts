import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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

export const Decks = mongoose.model('Decks', productSchema, 'Products');
export const Trucks = mongoose.model('Trucks', productSchema, 'ProductsTrucks');
export const Complites = mongoose.model('Complites', productSchema, 'ProductsComplites');
