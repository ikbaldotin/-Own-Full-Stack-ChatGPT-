import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config()
export const geminiClient = new GoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY, // Put your Gemini API key in .env
});
