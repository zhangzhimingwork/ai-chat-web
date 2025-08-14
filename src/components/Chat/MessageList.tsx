import React, { useEffect } from 'react';
import { Message } from '../../types';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from '../UI';

// 工具函数
const scrollToBottom = (element: HTMLElement) => {
  element.scrollTop = element.scrollHeight;
};

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping,
  messagesEndRef
}) => {
  // 自动滚动到底部
  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom(messagesEndRef.current.parentElement!);
    }
  }, [messages, isTyping, messagesEndRef]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            开始新对话
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            向AI助手提问任何问题，我会尽力帮助你解答。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}
        
        {/* 正在输入指示器 */}
        {isTyping && (
          <div className="flex space-x-3 p-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  AI助手
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  正在输入...
                </span>
              </div>
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>
      
      {/* 滚动锚点 */}
      <div ref={messagesEndRef} />
    </div>
  );
};