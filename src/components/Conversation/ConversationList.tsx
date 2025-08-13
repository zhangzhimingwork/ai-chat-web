import React from 'react';
import { ConversationItem } from './ConversationItem';
import { Conversation } from '../../types';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

interface ConversationListProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  className?: string;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentConversation,
  onSelectConversation,
  onDeleteConversation,
  className
}) => {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400">
        <ChatBubbleLeftIcon className="w-8 h-8 mb-2" />
        <p className="text-sm">暂无对话历史</p>
        <p className="text-xs mt-1">开始一个新对话吧</p>
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={currentConversation?.id === conversation.id}
          onClick={() => onSelectConversation(conversation.id)}
          onDelete={() => onDeleteConversation(conversation.id)}
        />
      ))}
    </div>
  );
};