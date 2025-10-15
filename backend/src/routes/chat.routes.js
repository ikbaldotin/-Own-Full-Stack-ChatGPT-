import express from "express"
import { createChat, getChats, deleteChats } from "../controllers/chat.controller.js"
import { isAuth } from "../middleware/Auth.js"

const chatRoutes = express.Router()
chatRoutes.get("/create", isAuth, createChat)
chatRoutes.get("/get", isAuth, getChats)
chatRoutes.post("/delete", isAuth, deleteChats)

export default chatRoutes;