import express from "express"
import { isAuth } from "../middleware/Auth.js"
import { imageMessageController, textMessageController } from "../controllers/message.controller.js"

const messageRoute = express.Router()

messageRoute.post("/text", isAuth, textMessageController)
messageRoute.post("/image", isAuth, imageMessageController)

export default messageRoute;