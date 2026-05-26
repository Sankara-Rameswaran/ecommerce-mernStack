import Router from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProductById } from "../controllers/productController.js"
import upload from "../middleware/uploadMiddleware.js"
import { uploadProduct } from "../controllers/uploadProductController.js"
const router = Router()

router.post('/',authMiddleware,roleMiddleware("ADMIN"),upload.array("images",5),createProduct)

router.get('/',getAllProducts)

router.get('/:id',getProductById)

router.patch('/:id',authMiddleware,roleMiddleware("ADMIN"),updateProductById)

router.delete('/:id',authMiddleware,roleMiddleware("ADMIN"),deleteProduct)

router.post('/upload-image',authMiddleware,roleMiddleware("ADMIN"),upload.array("images",5),uploadProduct)

export default router;