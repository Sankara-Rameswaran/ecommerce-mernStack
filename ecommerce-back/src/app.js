import express from "express"
import cors from "cors"
import healthRoutes from "./routes/healthRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/health",healthRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

export default app ;