import Chat from "../models/Chat.js"
import User from "../models/User.js"
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id
        const { chatId, prompt } = req.body
        const chat = await Chat.findOne({ userId, _id: chatId })
        chat.messages.push({ role: "User", content: prompt, timestamp: Date.now(), isImage: false })
        const { choices } = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        const reply = { ...choices[0].message, timestamp: Date.now() }
        res.json({ success: true, reply })
        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } }) \
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id
        const credits = req.user.credits
        if (credits < 0) {
            return res.status(403).json({ success: false, message: "Not enough credits" })
        }
        const { prompt, chatId, isPublished } = req.body
        const chat = await Chat.findOne({ userId, _id: chatId })
        chat.messages.push({ ole: "User", content: prompt, timestamp: Date.now(), isImage: false })
    } catch (error) {

    }
}