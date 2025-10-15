import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../../public/assets";
import Message from "./Message";
import toast from "react-hot-toast";

const Chatbox = () => {
  const { selectChat, theme, user, axios, setUser, token } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const containerRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to continue");
    if (!prompt.trim()) return;

    setLoading(true);
    const currentPrompt = prompt;
    setPrompt("");

    // Add user message locally
    const userMessage = {
      role: "user",
      content: currentPrompt,
      timestamp: new Date(),
      isImage: false,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const { data } = await axios.post(
        `/api/message/${mode}`,
        {
          chatId: selectChat?._id,
          prompt: currentPrompt,
          isPublished,
        },
        { headers: { Authorization: token } }
      );

      if (data.success) {
        const aiMessage = {
          ...data.reply,
          timestamp: new Date(),
          isImage: mode === "image",
        };
        setMessages((prev) => [...prev, aiMessage]);

        // Deduct user credits
        setUser((prev) => ({
          ...prev,
          credits: prev.credits - (mode === "image" ? 2 : 1),
        }));
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      {/* Chat Messages */}
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
            <img
              src={theme === "dark" ? assets.logo_full_dark : assets.logo_full}
              alt="Logo"
              className="w-full max-w-56 sm:max-w-68 h-full"
            />
            <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white">
              Ask me anything...
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      {/* Published Image Toggle */}
      {mode === "image" && (
        <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto">
          <p className="text-xs">Publish generated image to community</p>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Prompt Input */}
      <form
        onSubmit={onSubmit}
        className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#8B609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center"
      >
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-sm pl-3 pr-2 outline-none"
        >
          <option className="dark:bg-purple-900" value="text">
            Text
          </option>
          <option className="dark:bg-purple-900" value="image">
            Image
          </option>
        </select>

        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your prompt here..."
          className="flex-1 text-sm outline-none"
          required
        />

        <button type="submit" disabled={loading}>
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            alt="Send"
            className="w-8 cursor-pointer"
          />
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
