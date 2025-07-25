import { useState } from 'react';
import { ThemeProvider } from './contexts/themeContext';
import Header from './components/header';
import ChatPanel from './components/chatPanel';
import ResponsePanel from './components/responsePanel';

import { GoogleGenAI } from "@google/genai";
import { SpeedInsights } from "@vercel/speed-insights/react"


interface Message {
  id: string;
  content: string;
  timestamp: Date;
  mode: 'brainstorm' | 'summarize' | 'transform';
}

function App() {
  const [currentMode, setCurrentMode] = useState<'brainstorm' | 'summarize' | 'transform'>('brainstorm');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    
    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = await generateAIResponse(message, currentMode);
      
    const newMessage: Message = {
      id: Date.now().toString(),
      content: response,
      timestamp: new Date(),
      mode: currentMode
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(false);
  };



  const generateAIResponse = async(prompt: string, mode: 'brainstorm' | 'summarize' | 'transform') => {

    const ai = new GoogleGenAI({
      apiKey: import.meta.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are FocusFlow, an AI assistant designed to help writers, educators, and designers brainstorm, summarize content, and rewrite text in creative tones.\n\nYour job is to understand the user's message and reply accordingly based on their intent.\n\n- If the input is a question or idea, help expand it into structured suggestions.\n- If the input is content, you may be asked to summarize or rewrite it in a specific tone.\n\nAlways return a helpful, structured, and positive response.\n\nInput: ${prompt}\nTask: ${mode === 'brainstorm' ? 'Brainstorm ideas' : mode === 'summarize' ? 'Summarize the content' : 'Rewrite the content in a creative tone'}`,
    });

    return response.text || "No response from AI.";

  }

  const handleSave = () => {
    const dataToSave = {
      mode: currentMode,
      messages: messages,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focusflow-session-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const allContent = messages.map(msg => 
      `[${msg.mode.toUpperCase()}] ${msg.timestamp.toLocaleString()}\n${msg.content}`
    ).join('\n\n---\n\n');
    
    navigator.clipboard.writeText(allContent);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 transition-all duration-500 ease-ios">
        <Header
          currentMode={currentMode}
          onModeChange={setCurrentMode}
          onSave={handleSave}
          onCopy={handleCopy}
        />
        
        <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-4 lg:py-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-8 h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] lg:h-[calc(100vh-10rem)] animate-slide-up">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 ease-ios hover:shadow-2xl lg:hover:scale-[1.01] h-[45vh] lg:h-auto">
              <ChatPanel
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                mode={currentMode}
              />
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 ease-ios hover:shadow-2xl lg:hover:scale-[1.01] flex-1 lg:h-auto">
              <ResponsePanel
                messages={messages}
                isLoading={isLoading}
                onCopyMessage={handleCopyMessage}
                onClearMessages={handleClearMessages}
              />
            </div>
          </div>
        </main>
      </div>
      <SpeedInsights/>
    </ThemeProvider>
  );
}

export default App;