import React from 'react';
import {
  ChatBubbleLeftIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '../UI';
import { Conversation } from '../../types';
import clsx from 'clsx';

// 工具函数
const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = now.getTime() - time.getTime();
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  
  return time.toLocaleDateString('zh-CN');
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

interface SidebarProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  currentConversation,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onClose,
  isOpen
}) => {
  return (
    <>
      {/* 移动端遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* 侧边栏 */}
      <div className={clsx(
        'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:transform-none',
        {
          'translate-x-0': isOpen,
          '-translate-x-full': !isOpen
        }
      )}>
        <div className="flex flex-col h-full">
          {/* 侧边栏头部 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              对话历史
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNewConversation}
                title="新对话"
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="lg:hidden"
              >
                <XMarkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 对话列表 */}
          <div className="flex-1 overflow-y-auto">
            {conversations.length > 0 ? (
              <div className="p-2 space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={clsx(
                      'group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors',
                      {
                        'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800': 
                          currentConversation?.id === conversation.id,
                        'hover:bg-gray-50 dark:hover:bg-gray-700': 
                          currentConversation?.id !== conversation.id
                      }
                    )}
                    onClick={() => onSelectConversation(conversation.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <ChatBubbleLeftIcon className="flex-shrink-0 w-4 h-4 text-gray-500" />
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {truncateText(conversation.title, 30)}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatRelativeTime(conversation.updatedAt)}
                      </p>
                      {conversation.messages.length > 0 && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                          {truncateText(conversation.messages[conversation.messages.length - 1]?.content || '', 40)}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conversation.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-500 transition-all"
                      title="删除对话"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                <ChatBubbleLeftIcon className="w-8 h-8 mb-2" />
                <p className="text-sm">暂无对话历史</p>
                <p className="text-xs mt-1">开始一个新对话吧</p>
              </div>
            )}
          </div>

          {/* 侧边栏底部 */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="primary"
              size="sm"
              onClick={onNewConversation}
              className="w-full"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              新对话
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};