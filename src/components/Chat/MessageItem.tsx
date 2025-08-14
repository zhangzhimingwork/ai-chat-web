import React, { useState } from 'react';
import {
  UserIcon,
  CpuChipIcon,
  ClipboardIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Message } from '../../types';
import clsx from 'clsx';

// 工具函数
const formatMessageTime = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // 备用方案
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

interface MessageItemProps {
  message: Message;
  isLast?: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isLast }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={clsx(
      'group flex space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
      {
        'bg-blue-50/50 dark:bg-blue-900/10': isUser
      }
    )}>
      {/* 头像 */}
      <div className={clsx(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        {
          'bg-blue-600': isUser,
          'bg-gray-600 dark:bg-gray-500': !isUser
        }
      )}>
        {isUser ? (
          <UserIcon className="w-5 h-5 text-white" />
        ) : (
          <CpuChipIcon className="w-5 h-5 text-white" />
        )}
      </div>

      {/* 消息内容 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {isUser ? '你' : 'AI助手'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatMessageTime(message.timestamp)}
          </span>
        </div>
        
        {/* 移除prose类，使用自定义样式 */}
        <div className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed">
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded transition-colors"
            title="复制消息"
          >
            {copied ? (
              <>
                <CheckIcon className="w-3 h-3" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <ClipboardIcon className="w-3 h-3" />
                <span>复制</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};