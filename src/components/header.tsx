import React from 'react';
import { Save, Copy, Moon, Sun, Zap, Brain, FileText, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/themeContext';

interface HeaderProps {
  currentMode: 'brainstorm' | 'summarize' | 'transform';
  onModeChange: (mode: 'brainstorm' | 'summarize' | 'transform') => void;
  onSave: () => void;
  onCopy: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentMode, onModeChange, onSave, onCopy }) => {
  const { theme, toggleTheme } = useTheme();

  const modes = [
    { key: 'brainstorm', label: 'Brainstorm', icon: Brain },
    { key: 'summarize', label: 'Summarize', icon: FileText },
    { key: 'transform', label: 'Transform', icon: Sparkles },
  ] as const;

  return (
    <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 sticky top-0 z-50 transition-all duration-300 ease-ios">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 animate-fade-in">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200 ease-ios shadow-lg">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FocusFlow
            </h1>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center space-x-0.5 sm:space-x-1 bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-0.5 sm:p-1 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.key}
                  onClick={() => onModeChange(mode.key)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-medium transition-all duration-300 ease-ios transform active:scale-95 sm:hover:scale-105 ${
                    currentMode === mode.key
                      ? 'bg-white/80 dark:bg-gray-700/80 text-blue-600 dark:text-blue-400 shadow-md backdrop-blur-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm hidden xs:inline sm:inline">{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={onSave}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600/80 hover:bg-blue-700/90 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 ease-ios transform active:scale-95 sm:hover:scale-105 shadow-lg backdrop-blur-sm text-sm sm:text-base"
            >
              <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button
              onClick={onCopy}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-200/60 dark:bg-gray-700/60 hover:bg-gray-300/70 dark:hover:bg-gray-600/70 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-medium transition-all duration-300 ease-ios transform active:scale-95 sm:hover:scale-105 shadow-md backdrop-blur-sm text-sm sm:text-base"
            >
              <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Copy</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 bg-gray-200/60 dark:bg-gray-700/60 hover:bg-gray-300/70 dark:hover:bg-gray-600/70 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl transition-all duration-300 ease-ios transform active:scale-95 sm:hover:scale-110 shadow-md backdrop-blur-sm"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;