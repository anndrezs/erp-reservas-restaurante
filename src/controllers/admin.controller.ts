import { Request, Response } from 'express';
import Reservation from '../models/Reservations';

export const getAllReservations = async (_req: Request, res: Response) => {
  try {
    const all = await Reservation.find()
      .populate('clientId', 'name email')
      .populate('restaurantId', 'name')
      .populate('tableId');
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar reservas', error: err });
  }
};