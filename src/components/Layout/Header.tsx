import React from 'react';
import { 
  Bars3Icon, 
  ChatBubbleLeftRightIcon,
  SunIcon,
  MoonIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { Button } from '../UI';
import { useTheme } from '../../hooks';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onNewChat,
  sidebarOpen
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Bars3Icon className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Chat
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onNewChat}
            className="hidden sm:flex"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            新对话
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
          >
            {theme === 'light' ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};