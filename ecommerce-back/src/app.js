import express from "express"
import cors from "cors"
import healthRoutes from "./routes/healthRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/health",healthRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use('/uploads', express.static('src/uploads'))

export default app ;