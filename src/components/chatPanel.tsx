import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatPanelProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  mode: 'brainstorm' | 'summarize' | 'transform';
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onSendMessage, isLoading, mode }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  const placeholders = {
    brainstorm: "Tell me about your project, and I'll help you brainstorm ideas...",
    summarize: "Paste your text here, and I'll create a concise summary...",
    transform: "Share your content, and I'll help you transform it..."
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Mode Description */}
      <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-blue-50/60 to-purple-50/60 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ease-ios">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
          {mode === 'brainstorm' && 'Brainstorm Ideas'}
          {mode === 'summarize' && 'Summarize Content'}
          {mode === 'transform' && 'Transform Text'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {mode === 'brainstorm' && 'Generate creative ideas and explore new perspectives'}
          {mode === 'summarize' && 'Create concise summaries of your content'}
          {mode === 'transform' && 'Rewrite and enhance your text in different styles'}
        </p>
      </div>

      {/* Input Area */}
      <div className="flex-1 flex flex-col justify-end p-3 sm:p-4 lg:p-6">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 animate-slide-up">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholders[mode]}
              className="w-full h-24 sm:h-28 lg:h-32 p-3 sm:p-4 border border-gray-300/50 dark:border-gray-600/50 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ease-ios shadow-sm hover:shadow-md focus:shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70 text-sm sm:text-base"
              disabled={isLoading}
            />
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center space-x-2 transition-opacity duration-200">
              <span className="text-xs text-gray-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-1.5 py-0.5 rounded">
                {message.length}/1000
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <div className="text-xs text-gray-500 dark:text-gray-400 order-2 sm:order-1">
              Press Shift + Enter for new line
            </div>
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700/90 hover:to-purple-700/90 disabled:from-gray-400/80 disabled:to-gray-500/80 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 ease-ios disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform active:scale-95 sm:hover:scale-105 disabled:hover:scale-100 backdrop-blur-sm w-full sm:w-auto order-1 sm:order-2 text-sm sm:text-base min-h-[44px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin transition-transform duration-300" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;