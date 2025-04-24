import { Router } from 'express';
import { getAllReservations } from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/Auth.middleware';
import { authorizedRoles } from '../middlewares/role.middleware';

const router = Router();

router.get('/reservas', authMiddleware, authorizedRoles('admin'), getAllReservations);

export default router;
