import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { deleteUser, getAllUsers, getUserById, updateUserById } from "../controllers/userController.js";
import ownerOrAdminMiddleware from "../middleware/ownerOrAdminMiddleware.js";
import { addtoCart, deleteCart, updateCart, veiwCart } from "../controllers/cartController.js";


const router = Router();


router.post('/cart',authMiddleware,addtoCart)

router.patch('/cart',authMiddleware,updateCart)

router.get('/cart',authMiddleware,veiwCart)

router.delete('/cart',authMiddleware,deleteCart)

router.get('/',authMiddleware,roleMiddleware("ADMIN"),getAllUsers)

router.get('/:id',authMiddleware,roleMiddleware("ADMIN"),getUserById)

router.patch('/:id',authMiddleware,ownerOrAdminMiddleware,updateUserById)

router.delete('/:id',authMiddleware,roleMiddleware("ADMIN"),deleteUser)



export default router;