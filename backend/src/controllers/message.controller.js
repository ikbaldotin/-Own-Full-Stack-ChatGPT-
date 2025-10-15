import imagekit from "../config/imagekit.js"
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import axios from "axios"
import openai from "../config/openai.js"
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user?._id
        const credits = req.user.credits
        if (credits < 0) {
            return res.status(403).json({ success: false, message: "Not enough credits" })
        }
        const { chatId, prompt } = req.body
        if (!chatId || !prompt) {
            return res.status(400).json({ success: false, message: `chatId ${chatId} and prompt ${prompt} are required` })
        }
        const chat = await Chat.findOne({ userId: userId, _id: chatId })
        if (!chat) {
            return res.status(404).json({ success: false, message: `Chat not found chatid ${chatId} and userid ${userId}` })
        }
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
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, })

    }
}
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id
        const credits = req.user.credits
        if (credits < 2) {
            return res.status(403).json({ success: false, message: "Not enough credits" })
        }
        const { prompt, chatId, isPublished } = req.body
        const chat = await Chat.findOne({ userId: userId, _id: chatId })
        if (!chat) {
            return res.status(404).json({ success: false, message: `Chat not found chatid ${chatId} and userid ${userId}` })
        }
        chat.messages.push({ role: "User", content: prompt, timestamp: Date.now(), isImage: false })
        //endcode prompt
        const endcodePrompt = encodeURIComponent(prompt)
        //Construct the ImageKit URL
        const generativedImageUrl = `${process.env.IMAGEKIT_API_URL_ENDPOINT}/ik-genimg-prompt-${endcodePrompt}/mygpt/${Date.now()}.png?tr=w-800,h-800`
        // Fetch the image from the constructed URL
        const aImageResponse = await axios.get(generativedImageUrl, { responseType: "arraybuffer" })
        //converted to Base64
        const Base64Image = `data:image/png;base64,${Buffer.from(aImageResponse.data, "binary").toString("base64")}`
        //Upload to ImageKit Media Library
        if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY) {
            console.log("❌ ImageKit ENV Missing!");
        }
        const uploadResponse = await imagekit.upload({
            file: Base64Image,
            fileName: `${Date.now()}.png`,
            folder: "mygpt"
        })
        const reply = { role: `assistant`, content: uploadResponse.url, timestamp: Date.now(), isImage: true, isPublished }
        res.json({ success: true, reply })
        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
