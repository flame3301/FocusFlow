import { useState } from 'react';
import { ThemeProvider } from './contexts/themeContext';
import Header from './components/header';
import ChatPanel from './components/chatPanel';
import ResponsePanel from './components/responsePanel';

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
    
    const response = generateAIResponse(message, currentMode);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: response,
      timestamp: new Date(),
      mode: currentMode
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(false);
  };

  const generateAIResponse = (input: string, mode: 'brainstorm' | 'summarize' | 'transform'): string => {
    const responses = {
      brainstorm: [
        `Great topic! Here are some creative ideas based on "${input.substring(0, 50)}...":\n\n• Explore different angles and perspectives\n• Consider your target audience's needs\n• Think about current trends and how they apply\n• Look for unexpected connections\n• Consider the "what if" scenarios\n\nWould you like me to dive deeper into any of these directions?`,
        `I love the direction you're heading with "${input.substring(0, 50)}..."! Here are some fresh ideas:\n\n• Break down the core concept into smaller, actionable pieces\n• Consider the opposite approach - what would that look like?\n• Think about cross-industry applications\n• Explore the emotional aspects\n• Consider time-based variations (short-term vs long-term)\n\nWhich of these resonates most with your vision?`
      ],
      summarize: [
        `Here's a concise summary of your content:\n\n**Key Points:**\n• Main theme: ${input.substring(0, 30)}...\n• Core message focuses on practical applications\n• Important details that support the main argument\n• Actionable insights for implementation\n\n**Takeaway:** The content emphasizes the importance of structured thinking and provides a clear framework for moving forward.`,
        `**Summary:**\n\nYour text covers several important aspects:\n\n• **Main Focus:** ${input.substring(0, 40)}...\n• **Supporting Evidence:** Well-structured arguments with clear examples\n• **Practical Applications:** Real-world implications and next steps\n• **Key Insight:** The importance of maintaining focus while exploring new possibilities\n\nThis provides a solid foundation for further development.`
      ],
      transform: [
        `Here's your content transformed into a more engaging format:\n\n**Original concept enhanced:**\n\n${input.substring(0, 100)}...\n\n**Transformed version:**\n\nImagine a world where your ideas flow effortlessly from thought to reality. This approach takes your core concept and elevates it with:\n\n• Dynamic storytelling elements\n• Emotional resonance\n• Clear call-to-action\n• Professional polish\n\nWould you like me to adjust the tone or style further?`,
        `I've transformed your content with a fresh perspective:\n\n**Enhanced Version:**\n\nBuilding on your foundation of "${input.substring(0, 50)}...", here's a more compelling presentation:\n\n• **Hook:** Immediate engagement with your audience\n• **Value Proposition:** Clear benefits and outcomes\n• **Evidence:** Supporting details that build credibility\n• **Action Steps:** Concrete next steps for implementation\n\nThis version maintains your core message while making it more impactful and actionable.`
      ]
    };

    const modeResponses = responses[mode];
    return modeResponses[Math.floor(Math.random() * modeResponses.length)];
  };

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
              />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;