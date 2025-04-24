import { Router } from "express";
import { createTable, getTablesByRestaurants, updateTable, deleteTable } from "../controllers/Table.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";
import { authorizedRoles } from "../middlewares/role.middleware";


const router = Router();

router.post('/', authMiddleware, authorizedRoles('restaurants'), createTable);
router.get('/:restaurantId', authMiddleware, getTablesByRestaurants);
router.put('/:id', authMiddleware, authorizedRoles('restaurants'), updateTable);
router.delete('/:id', authMiddleware, authorizedRoles('restaurants'), deleteTable)

export default router;