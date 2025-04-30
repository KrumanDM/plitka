import express from 'express';
import { Decks, Trucks, Complites } from '../models/productModel.ts';

const router = express.Router();

// Маршрут для получения всех продуктов типа Decks
router.get('/decks', async (req, res) => {
  try {
    const decks = await Decks.find();
    res.status(200).send(decks);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка при получении Decks', error: error.message });
  }
});

// Маршрут для получения всех продуктов типа Trucks
router.get('/trucks', async (req, res) => {
  try {
    const trucks = await Trucks.find();
    res.status(200).send(trucks);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка при получении Trucks', error: error.message });
  }
});

// Маршрут для получения всех продуктов типа Complites
router.get('/complites', async (req, res) => {
  try {
    const complites = await Complites.find();
    res.status(200).send(complites);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка при получении Complites', error: error.message });
  }
});

export default router;
