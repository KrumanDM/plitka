import express from 'express';
import { Decks, Trucks, Complites } from '../models/productModel';
import { Request, Response } from 'express';

const router = express.Router();

// Маршрут для получения всех продуктов типа Decks
router.get('/decks', async (req: Request, res: Response) => {
  try {
    const decks = await Decks.find();
    res.status(200).send(decks);
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: 'Ошибка при получении Decks', error: err.message });
  }
});

// Маршрут для получения всех продуктов типа Trucks
router.get('/trucks', async (req: Request, res: Response) => {
  try {
    const trucks = await Trucks.find();
    res.status(200).send(trucks);
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: 'Ошибка при получении Trucks', error: err.message });
  }
});

// Маршрут для получения всех продуктов типа Complites
router.get('/complites', async (req: Request, res: Response) => {
  try {
    const complites = await Complites.find();
    res.status(200).send(complites);
  } catch (error) {
    const err = error as Error;
    res.status(500).send({ message: 'Ошибка при получении Complites', error: err.message });
  }
});

export default router;
