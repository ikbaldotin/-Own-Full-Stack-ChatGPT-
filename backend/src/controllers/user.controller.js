import bcrypt from "bcryptjs"
import User from "../models/User"
import jwt from "jsonwebtoken"
const generatedToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SEC, { expiresIn: "7d" })
}
export const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const newExits = await User.findOne({ email })
        if (newExits) {
            return res.status(400).json({ message: "User already exits" })
        }
        const user = await User.create({ name, email, password })
        const token = generatedToken(user._id)
        res.json({ message: "User register successfully", token })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = generatedToken(user._id)
        res.status(200).json({ message: "User login successfully", token })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
export const getUser = async (req, res) => {
    try {
        const user = req.user
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }

}