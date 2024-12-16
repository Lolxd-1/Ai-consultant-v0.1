import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatSectionProps {
  activeProfile: string;
  chatHistory: Record<string, Message[]>;
  onSendMessage: (profile: string, message: string) => void;
  isLoading?: boolean;
}

export function ChatSection({ activeProfile, chatHistory, onSendMessage, isLoading }: ChatSectionProps) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = chatHistory[activeProfile] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      setError(null);
      try {
        await onSendMessage(activeProfile, message);
        setMessage('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send message');
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-black rounded-2xl overflow-hidden
      border border-white/20 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
      {/* Chat Background */}
      <div className="flex-1 overflow-y-auto space-y-4 p-6
        bg-gradient-to-b from-black/20 to-black/10 backdrop-blur-sm
        scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
        hover:scrollbar-thumb-white/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 backdrop-blur-md
                shadow-lg transition-all duration-300 hover:shadow-xl
                ${msg.role === 'user'
                  ? 'bg-blue-600 text-white ml-12 hover:-translate-y-0.5'
                  : 'bg-white/10 text-white mr-12 hover:-translate-y-0.5'}`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl px-4 py-3 
              bg-white/10 backdrop-blur-md mr-12">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" 
                  style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" 
                  style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" 
                  style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative">
        <div className="absolute top-0 left-4 right-4 h-[2px] bg-white/10 rounded-full" />
        <div className="p-4 bg-white/10 backdrop-blur-xl
          shadow-[0_-4px_20px_rgba(255,255,255,0.1)]">
          <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
              disabled={isLoading}
              className="flex-1 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3
                text-white placeholder-white/50
                border border-white/20 hover:border-white/40
                focus:outline-none focus:ring-2 focus:ring-white/30
                shadow-[0_2px_10px_rgba(255,255,255,0.1)]
                disabled:opacity-50 transition-all duration-300"
            />

            <button
              type="button"
              disabled={isLoading}
              className="p-3 text-white/70 hover:text-white
                bg-white/10 hover:bg-white/20 rounded-xl
                backdrop-blur-md border border-white/20
                transition-all duration-300 hover:scale-105 active:scale-95
                disabled:opacity-50 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
            </button>

            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="p-3 bg-white/20 hover:bg-white/30
                text-white rounded-xl border border-white/20
                backdrop-blur-md transition-all duration-300
                hover:scale-105 active:scale-95
                disabled:opacity-50 shadow-lg"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}