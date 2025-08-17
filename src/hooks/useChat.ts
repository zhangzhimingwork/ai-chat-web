import { useState, useRef, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Conversation, Message, UseChatReturn } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { CHAT_QUERY } from '../graphql/queries';

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

  // 🔧 使用 Apollo Client 的 useLazyQuery
  const [executeChat, { loading: queryLoading, error: queryError }] = useLazyQuery(CHAT_QUERY, {
    fetchPolicy: 'network-only', // 总是从网络获取最新数据
    errorPolicy: 'all', // 允许部分数据和错误同时存在
    onError: (error) => {
      console.error('GraphQL Chat Error:', error);
      setError(error.message || '发送消息失败，请重试');
      setIsLoading(false);
      setIsTyping(false);
    }
  });

  const sendMessage = useCallback(async (message: string, systemPrompt?: string) => {
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
      
      // 🔧 使用 GraphQL 查询替代 REST API
      const result = await executeChat({
        variables: {
          message: message.trim(),
          conversationId: conversation.id,
          systemPrompt: systemPrompt || undefined
        }
      });
      // 检查 GraphQL 响应
      if (result.error) {
        throw new Error(result.error.message);
      }

      if (!result.data?.chat) {
        throw new Error('未收到有效的响应数据');
      }

      const chatResult = result.data.chat;
      
      // 添加AI回复
      const aiMessage = createMessage(chatResult.message, 'assistant');
      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
        updatedAt: new Date().toISOString(),
        // 🔧 可选：保存 GraphQL 返回的额外信息
        lastUsage: chatResult.usage,
        lastModel: chatResult.model
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
      const errorMessage = err instanceof Error ? err.message : '发送消息失败，请重试';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [currentConversation, conversations, executeChat]);

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

  // 🔧 新增：重试发送消息
  const retryLastMessage = useCallback(() => {
    if (currentConversation && currentConversation.messages.length > 0) {
      const lastUserMessage = [...currentConversation.messages]
        .reverse()
        .find(msg => msg.role === 'user');
      
      if (lastUserMessage) {
        // 移除最后的错误消息（如果存在）
        const messagesWithoutLastAI = currentConversation.messages.filter((msg, index) => {
          if (msg.role === 'assistant' && index === currentConversation.messages.length - 1) {
            return false;
          }
          return true;
        });
        
        const updatedConversation = {
          ...currentConversation,
          messages: messagesWithoutLastAI
        };
        
        setCurrentConversation(updatedConversation);
        setConversations(prev => 
          prev.map(c => c.id === updatedConversation.id ? updatedConversation : c)
        );
        
        // 重新发送消息
        sendMessage(lastUserMessage.content);
      }
    }
  }, [currentConversation, sendMessage]);

  return {
    currentConversation,
    conversations,
    isLoading: isLoading || queryLoading, // 🔧 合并加载状态
    isTyping,
    error: error || queryError?.message || null, // 🔧 合并错误状态
    sendMessage,
    createConversation,
    selectConversation,
    deleteConversation,
    clearError,
    retryLastMessage, // 🔧 新增重试功能
    messagesEndRef
  };
};