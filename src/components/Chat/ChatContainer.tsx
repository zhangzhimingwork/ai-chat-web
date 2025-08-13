import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ErrorMessage } from '../UI';
import { Conversation } from '../../types';

interface ChatContainerProps {
  conversation: Conversation | null;
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  onSendMessage: (message: string) => Promise<void>;
  onClearError: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  conversation,
  isLoading,
  isTyping,
  error,
  onSendMessage,
  onClearError,
  messagesEndRef
}) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* 错误提示 */}
      {error && (
        <div className="p-4">
          <ErrorMessage message={error} onClose={onClearError} />
        </div>
      )}
      
      {/* 消息列表 */}
      <MessageList
        messages={conversation?.messages || []}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />
      
      {/* 消息输入 */}
      <MessageInput
        onSendMessage={onSendMessage}
        disabled={isLoading}
        placeholder={conversation ? "输入消息..." : "开始新对话..."}
      />
    </div>
  );
};