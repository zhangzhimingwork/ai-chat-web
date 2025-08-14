import { useState, useRef, useCallback } from 'react';
import { Conversation, Message, UseChatReturn } from '../types';
import { UI_CONSTANTS, STORAGE_KEYS } from '../utils/constants';

// 工具函数
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const createMessage = (content: string, role: 'user' | 'assistant'): Message => {
  return {
    id: generateId(),
    content,
    role,
    timestamp: new Date().toISOString()
  };
};

const createNewConversation = (title?: string): Conversation => {
  return {
    id: generateId(),
    title: title || '新对话',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// 本地存储工具
const saveToStorage = (conversations: Conversation[], currentId?: string) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    if (currentId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_CONVERSATION, currentId);
    }
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const loadFromStorage = () => {
  try {
    const conversations = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONVERSATIONS) || '[]');
    const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_CONVERSATION);
    return { conversations, currentId };
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return { conversations: [], currentId: null };
  }
};

export const useChat = (): UseChatReturn => {
  const { conversations: savedConversations, currentId } = loadFromStorage();
  
  const [conversations, setConversations] = useState<Conversation[]>(savedConversations);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(
    currentId ? savedConversations.find((c: Conversation) => c.id === currentId) || null : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 如果没有当前对话，创建一个新的
      let conversation = currentConversation;
      if (!conversation) {
        conversation = createNewConversation();
        setCurrentConversation(conversation);
        setConversations(prev => [conversation!, ...prev]);
      }
      
      // 添加用户消息
      const userMessage = createMessage(message, 'user');
      const updatedConversation = {
        ...conversation,
        messages: [...conversation.messages, userMessage],
        updatedAt: new Date().toISOString()
      };
      
      setCurrentConversation(updatedConversation);
      setConversations(prev => 
        prev.map(c => c.id === updatedConversation.id ? updatedConversation : c)
      );
      
      setIsTyping(true);
      
      // 调用API
      const response = await fetch(process.env.REACT_APP_API_URL || '/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationId: conversation.id,
          model: 'deepseek-chat'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 添加AI回复
      const aiMessage = createMessage(data.message, 'assistant');
      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
        updatedAt: new Date().toISOString()
      };
      
      setCurrentConversation(finalConversation);
      setConversations(prev => 
        prev.map(c => c.id === finalConversation.id ? finalConversation : c)
      );
      
      // 保存到本地存储
      const newConversations = conversations.map(c => 
        c.id === finalConversation.id ? finalConversation : c
      );
      if (!conversations.find(c => c.id === finalConversation.id)) {
        newConversations.unshift(finalConversation);
      }
      saveToStorage(newConversations, finalConversation.id);
      
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('发送消息失败，请重试');
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [currentConversation, conversations]);

  const createConversation = useCallback(() => {
    const newConversation = createNewConversation();
    setCurrentConversation(newConversation);
    setConversations(prev => [newConversation, ...prev]);
    saveToStorage([newConversation, ...conversations], newConversation.id);
  }, [conversations]);

  const selectConversation = useCallback((id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
      saveToStorage(conversations, id);
    }
  }, [conversations]);

  const deleteConversation = useCallback((id: string) => {
    const newConversations = conversations.filter(c => c.id !== id);
    setConversations(newConversations);
    
    if (currentConversation?.id === id) {
      const nextConversation = newConversations[0] || null;
      setCurrentConversation(nextConversation);
      saveToStorage(newConversations, nextConversation?.id);
    } else {
      saveToStorage(newConversations, currentConversation?.id);
    }
  }, [conversations, currentConversation]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    currentConversation,
    conversations,
    isLoading,
    isTyping,
    error,
    sendMessage,
    createConversation,
    selectConversation,
    deleteConversation,
    clearError,
    messagesEndRef
  };
};