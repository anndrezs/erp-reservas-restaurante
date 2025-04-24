import { Request, Response } from 'express';
import Reservation from '../models/Reservations';
import Table from '../models/Table';
import User from '../models/User';
import { sendConfirmationEmail } from '../services/email.service';

export const createReservation = async (req: Request, res: Response) => {
    try {
        const clienteId = (req as any).user.id;
        const { restaurantId, tableId, date } = req.body;
        const table = await Table.findById(tableId);
        if (!table || !table.isAvailable) {
            res.status(400).json({ message: 'Mesa não disponível' });
            return;
        }
        const existing = await Reservation.findOne({ tableId, date });
        if (existing){
            res.status(400).json({ message: 'Já existe uma reserva para esta mesa neste horário' });
            return;
        }
        const reservation = new Reservation({clienteId, restaurantId, tableId, date});
        await reservation.save();

        const user = await User.findById(clienteId);
        if (user) {
            await sendConfirmationEmail(user.email, reservation.id.toString(), date);
          }
          res.status(201).json(reservation);
        } catch (err) {
          res.status(500).json({ message: 'Erro ao criar reserva', error: err });
        }

    };
    export const getReservationsByUser = async (req: Request, res: Response) =>{
      try {
        const user = (req as any).user;
        let filter: any = {};
        if (user.role === 'cliente') {
          filter.clienteId = user.id;
        } else if (user.role === 'restaurante') {
          filter.restaurantId = req.query.restaurantId;
        }
        const reservations = await Reservation.find(filter)
        .populate('tableId')
        .populate('restaurantId', 'name address')
        .populate('clienteId', 'name, email');
        res.status(200).json(reservations);
      }catch (err) {
        res.status(500).json({ message: 'Erro ao buscar reservas', error: err });
      }
    };

      export const cancelReservation = async (req: Request, res: Response) =>{
        try{
          const {id} = req.params;
          const user = (req as any).user;

          const reservation = await Reservation.findById(id);
          if (!reservation) {
            res.status(404).json({ message: 'Reserva não encontrada' });
            return;
          }
          if (user.role === 'cliente' && reservation.clienteId.toString() !== user.id) {
            res.status(403).json({ message: 'Você não tem permissão para cancelar esta reserva' });
            return;
          }
          reservation.status = 'cancelada';
          await reservation.save();
          const table = await Table.findById(reservation.tableId);
          if (table) {
            table.isAvailable = true;
            await table.save();
          }
          res.json({ message: 'Reserva cancelada com sucesso' });
        }catch (err) {
          res.status(500).json({ message: 'Erro ao cancelar reserva', error: err });
      }
    };
