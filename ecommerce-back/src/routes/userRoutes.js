import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getAllUsers, getUserById } from "../controllers/userController.js";

const router = Router();

router.get('/',authMiddleware,roleMiddleware("ADMIN"),getAllUsers)

router.get('/:id',authMiddleware,roleMiddleware("ADMIN"),getUserById)

export default router;