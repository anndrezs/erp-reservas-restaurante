import { Request, Response } from 'express';
import Table from '../models/Table';


export const createTable = async (req: Request, res: Response) => {
  try {
    const { number, seats, restaurantId } = req.body;
    const newTable = new Table({ number, seats, restaurantId });
    await newTable.save();
    res.status(201).json(newTable);
    } catch (error) {
    res.status(500).json({ message: 'Erro ao criar mesa', error: error });
  };
};
export const getTablesByRestaurants = async (req: Request, res: Response) => {
  try { 
    const { restaurantId } = req.params;
    const tables = await Table.find({ restaurantId });
    res.json(tables);
  }catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mesas', error: error });
  }
};

export const updateTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Table.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) res.status(404).json({ message: 'Mesa não encontrada' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar mesa', error: err });
  }
};

export const deleteTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Table.findByIdAndDelete(id);
    if (!deleted) res.status(404).json({ message: 'Mesa não encontrada' });
    res.json({ message: 'Mesa removida com sucesso' });
    
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar mesa', error: err });
  }
};