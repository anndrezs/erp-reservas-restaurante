import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';


export const createRestaurant = async (req: Request, res: Response) => {
    try{
        const { name, description, address } = req.body;
        const owner = (req as any).user.id;
        const newRestaurant = new Restaurant({ name, description, address, owner });
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar restaurante', error: error});
    }
   
};

export const getRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.find().populate('owner', 'name email');
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar restaurantes', error: error});
    }
};



