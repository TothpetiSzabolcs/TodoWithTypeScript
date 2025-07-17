import dotenv from "dotenv"
import { connectDB } from "./config/db"
import express, { Application } from "express";
import TodoRoutes from "./routes/Todo.route"
import cors from "cors"

dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173"}))
const PORT: string | number = process.env.PORT || 8080

app.use("/api", TodoRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log(`Szerver elindult http://localhost:${PORT}`);
});