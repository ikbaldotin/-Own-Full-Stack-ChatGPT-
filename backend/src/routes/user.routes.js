import { register, login, getUser, getPublishedImages } from "../controllers/user.controller.js"
import express from "express"
import { isAuth } from "../middleware/Auth.js";
const UserRoutes = express.Router()

UserRoutes.post("/register", register);
UserRoutes.post("/login", login)
UserRoutes.get("/me", isAuth, getUser)
UserRoutes.get("/published-images", isAuth, getPublishedImages)

export default UserRoutes