import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER STARTED ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DATABASE CONNECTION FAILED:", err.message);
    process.exit(1);
  });