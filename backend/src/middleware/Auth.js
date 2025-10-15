import jwt from 'jsonwebtoken'
import User from "../models/User.js"
export const isAuth = async (req, res, next) => {
    let token = req.headers.authorization

    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC)
        const userId = decoded.id
        const user = await User.findById({ userId })
        if (!user) {
            return res.status(401).json({ message: "Not authorized, user not found" })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" })
    }
}