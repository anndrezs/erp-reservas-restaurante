import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuário excluído' });
};