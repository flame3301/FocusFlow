import React from 'react';
import { Copy, Check, Sparkles, Clock, Trash2 } from 'lucide-react';

import MarkdownRenderer from './markdownRenderer';



interface Message {
  id: string;
  content: string;
  timestamp: Date;
  mode: 'brainstorm' | 'summarize' | 'transform';
}

interface ResponsePanelProps {
  messages: Message[];
  isLoading: boolean;
  onCopyMessage: (content: string) => void;
  onClearMessages: () => void;
}

const ResponsePanel: React.FC<ResponsePanelProps> = ({ messages, isLoading, onCopyMessage, onClearMessages }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleCopy = (content: string, id: string) => {
    onCopyMessage(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };


  React.useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const lastMessage = messagesEndRef.current;
      
      // Smooth scroll to the latest message
      setTimeout(() => {
        lastMessage.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    } 
  }, [messages.length]);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-purple-50/60 to-pink-50/60 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ease-ios">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
              AI Responses
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Your AI-generated content will appear here
            </p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={onClearMessages}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500/80 hover:bg-red-600/90 text-white rounded-lg font-medium transition-all duration-300 ease-ios transform active:scale-95 sm:hover:scale-105 shadow-md backdrop-blur-sm text-xs sm:text-sm min-h-[32px]"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6"
      >
        {messages.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-center animate-scale-in">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-lg animate-bounce-gentle">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2 animate-fade-in">
              Ready to assist you
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md px-4">
              Start by typing your message in the input panel. I'll help you brainstorm, summarize, or transform your content.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                ref={messages.indexOf(message) === messages.length - 1 ? messagesEndRef : null}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-4 lg:p-6 hover:shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 ease-ios transform lg:hover:scale-[1.01] animate-slide-up"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                      {message.mode} Response
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center hidden sm:flex">
                      <Clock className="w-3 h-3 mr-1 hidden sm:inline" />
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    <button
                      onClick={() => handleCopy(message.content, message.id)}
                      className="p-1.5 sm:p-1 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 rounded-lg transition-all duration-200 ease-ios transform active:scale-95 sm:hover:scale-110 backdrop-blur-sm min-h-[32px] min-w-[32px] flex items-center justify-center"
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 animate-bounce-gentle" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <MarkdownRenderer content={message.content} />
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-4 lg:p-6 animate-slide-up">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce shadow-sm"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    AI is thinking...
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;