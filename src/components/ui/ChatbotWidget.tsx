"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hi! I am Koushik's AI assistant. Ask me anything about his resume, experience, or ML projects!",
    },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { role: "user", content: message }]);
    setMessage("");

    try {
      // Use relative /api for production (Azure SWA) and localhost for dev
      const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
        ? 'http://localhost:8000' 
        : '/api';

      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to Koushik's AI Backend. Is it running?" },
      ]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-10 w-[350px] md:w-[400px] h-[500px] bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-[999] flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white font-medium text-sm">Resume AI Agent</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-2 -mr-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-thin scrollbar-thumb-white/10">
              {chatHistory.map((chat, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    chat.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      chat.role === "user" ? "bg-indigo-600" : "bg-emerald-600/20 text-emerald-400"
                    }`}
                  >
                    {chat.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] ${
                      chat.role === "user"
                        ? "bg-indigo-600/20 text-indigo-100 rounded-tr-none border border-indigo-500/30"
                        : "bg-white/5 text-gray-300 rounded-tl-none border border-white/5"
                    }`}
                  >
                    {chat.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 bg-[#1a1a1a] border-t border-white/10 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about my projects..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all pr-12"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-300 disabled:text-gray-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-end gap-3 z-50 pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 2, type: "spring" }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-2xl rounded-br-none text-xs font-bold tracking-wide shadow-xl border border-white/20 relative"
          >
            Chat with my Resume
            <div className="absolute -bottom-1 right-2 w-3 h-3 bg-indigo-600 rotate-45 border-r border-b border-white/20" />
          </motion.div>
          
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 text-white transition-all transform hover:scale-110 pointer-events-auto group relative"
          >
            <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-20 group-hover:opacity-40" />
            <MessageSquare className="w-6 h-6 relative z-10" />
          </motion.button>
        </div>
      )}
    </>
  );
};
