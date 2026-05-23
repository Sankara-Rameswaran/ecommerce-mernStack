import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { deleteUser, getAllUsers, getUserById, updateUserById } from "../controllers/userController.js";
import ownerOrAdminMiddleware from "../middleware/ownerOrAdminMiddleware.js";

const router = Router();

router.get('/',authMiddleware,roleMiddleware("ADMIN"),getAllUsers)

router.get('/:id',authMiddleware,roleMiddleware("ADMIN"),getUserById)

router.patch('/:id',authMiddleware,ownerOrAdminMiddleware,updateUserById)

router.delete('/:id',authMiddleware,roleMiddleware("ADMIN"),deleteUser)

export default router;