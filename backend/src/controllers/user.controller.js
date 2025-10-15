import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import Chat from "../models/Chat.js"

export const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const newExits = await User.findOne({ email })
        if (newExits) {
            return res.status(400).json({ message: "User already exits" })
        }
        const user = await User.create({ name, email, password })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, { expiresIn: '7d' })
        res.json({ message: "User register successfully", user, token })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials " })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials ", })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, { expiresIn: '7d' })
        if (!token) {
            return res.status(500).json({ message: "Could not create token" })
        }
        res.status(200).json({
            success: true,   // ✅ Required
            message: "User login successfully",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error " })
    }
}
export const getUser = async (req, res) => {
    try {
        const user = req.user
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

export const getPublishedImages = async (req, res) => {
    try {
        const PublishedImageMessage = await Chat.aggregate([{
            $unwind: "$messages"
        }, {
            $match: {
                "messages.isImage": true,
                "messages.isPublished": true
            }
        }, {
            $project: {
                _id: 0,
                imageUrl: "messages.content",
                userName: "$userName"
            }
        }])
        res.json({ success: true, images: PublishedImageMessage.reverse() })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}