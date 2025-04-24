import  { Router } from "express";
import { createRestaurant, getRestaurants } from "../controllers/Restaurant.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";
import { authorizedRoles } from "../middlewares/role.middleware";


const router = Router();

router.post('/', authMiddleware, authorizedRoles('admin'), createRestaurant);
router.get('/', authMiddleware, getRestaurants);

export default router;