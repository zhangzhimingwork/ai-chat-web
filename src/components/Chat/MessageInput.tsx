import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Button, TextArea } from '../UI';
import { isEmptyString } from '../../utils';
import { UI_CONSTANTS } from '../../utils/constants';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "输入消息..."
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整高度
  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, []);

  // 发送消息
  const handleSendMessage = useCallback(() => {
    if (isEmptyString(message) || disabled) return;
    
    if (message.length > UI_CONSTANTS.MAX_MESSAGE_LENGTH) {
      alert(`消息长度不能超过${UI_CONSTANTS.MAX_MESSAGE_LENGTH}个字符`);
      return;
    }

    onSendMessage(message.trim());
    setMessage('');
    
    // 重置高度
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [message, disabled, onSendMessage]);

  // 处理键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // 处理输入变化
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  // 当消息改变时调整高度
  useEffect(() => {
    adjustTextareaHeight();
  }, [message, adjustTextareaHeight]);

  const canSend = !isEmptyString(message) && !disabled;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="p-4">
        <div className="flex space-x-3">
          <div className="flex-1">
            <TextArea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              resize={false}
              rows={1}
              className="min-h-[2.5rem] max-h-[7.5rem] resize-none"
              helperText={`${message.length}/${UI_CONSTANTS.MAX_MESSAGE_LENGTH}`}
            />
          </div>
          
          <div className="flex items-end">
            <Button
              onClick={handleSendMessage}
              disabled={!canSend}
              loading={disabled}
              className="mb-1"
              title="发送消息 (Enter)"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          按 Enter 发送，Shift + Enter 换行
        </div>
      </div>
    </div>
  );
};