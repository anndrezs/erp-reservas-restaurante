import { Router } from 'express';
import { createReservation, getReservationsByUser, cancelReservation } from '../controllers/Reservation.controller';
import { authMiddleware } from '../middlewares/Auth.middleware';
import { authorizedRoles } from "../middlewares/role.middleware";

const router = Router();

router.post('/', authMiddleware, authorizedRoles('cliente'), createReservation);
router.get('/', authMiddleware, getReservationsByUser);
router.put('/:id/cancelar', authMiddleware, authorizedRoles('cliente', 'admin'), cancelReservation);

export default router;
