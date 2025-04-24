import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";


export const authorizedRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user as IUser;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: 'Acesso negado' });
            return;
        }
        next();
    }    

};