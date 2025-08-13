import React from 'react';
import {
  ChatBubbleLeftIcon,
  TrashIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { Conversation } from '../../types';
import { formatRelativeTime, truncateText } from '../../utils';
import clsx from 'clsx';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  className?: string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
  onDelete,
  className
}) => {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <div
      className={clsx(
        'group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors',
        {
          'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800': isActive,
          'hover:bg-gray-50 dark:hover:bg-gray-700': !isActive
        },
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <ChatBubbleLeftIcon className="flex-shrink-0 w-5 h-5 text-gray-500" />
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {truncateText(conversation.title, 40)}
          </h3>
          
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatRelativeTime(conversation.updatedAt)}
            </p>
            
            {conversation.messages.length > 0 && (
              <>
                <span className="text-xs text-gray-400">·</span>
                <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                  {conversation.messages.length} 条消息
                </p>
              </>
            )}
          </div>
          
          {lastMessage && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
              {lastMessage.role === 'user' ? '你: ' : 'AI: '}
              {truncateText(lastMessage.content, 50)}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="删除对话"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: 添加更多操作菜单
          }}
          className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="更多操作"
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};