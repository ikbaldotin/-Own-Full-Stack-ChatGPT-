import Chat from "../models/Chat"

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id
        const chatData = { userId, messages: [], name: "new Chat", userName: req.user.name }
        await Chat.create(chatData)
        res.json({ success: true, messages: "Chat created" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}
export const getChats = async (req, res) => {
    try {
        const userId = req.user._id
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 })

        res.json({ success: true, chats })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}
export const deleteChats = async (req, res) => {
    try {
        const userId = req.user._id
        const { chatId } = req.body
        await Chat.deleteOne({ _id: chatId, userId })

        res.json({ success: true, message: "chat deleted" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}