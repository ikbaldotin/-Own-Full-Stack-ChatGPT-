import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import connectDb from './config/db.js';
import UserRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
dotenv.config();
const app = express()
const port = process.env.PORT
connectDb()
app.use(express.json())
app.use(cors())
app.use("/api/user", UserRoutes)
app.use("/api/chat", chatRoutes)
app.listen(port, () => {
    console.log(`server is running ${port}`)
})