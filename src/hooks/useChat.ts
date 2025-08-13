import { useState, useCallback, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_MESSAGE } from '../graphql/mutations';
import { GET_CONVERSATIONS, GET_CONVERSATION } from '../graphql/queries';
import { Message, Conversation, ChatRequest, ChatResponse } from '../types';
import { 
  createMessage, 
  createNewConversation, 
  generateConversationTitle,
  getErrorMessage,
  setLocalStorage,
  getLocalStorage
} from '../utils';
import { STORAGE_KEYS, DEFAULT_CONFIG, UI_CONSTANTS } from '../utils/constants';

export interface UseChatReturn {
  // 状态
  currentConversation: Conversation | null;
  conversations: Conversation[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  
  // 操作
  sendMessage: (content: string) => Promise<void>;
  createConversation: () => void;
  selectConversation: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
  clearError: () => void;
  
  // 引用
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const useChat = (): UseChatReturn => {
  // 状态
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 引用
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // GraphQL
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const { data: conversationsData, refetch: refetchConversations } = useQuery(GET_CONVERSATIONS);
  
  // 初始化从本地存储加载数据
  useEffect(() => {
    const savedConversations = getLocalStorage<Conversation[]>(STORAGE_KEYS.CONVERSATIONS, []);
    const savedCurrentConversation = getLocalStorage<Conversation | null>(
      STORAGE_KEYS.CURRENT_CONVERSATION, 
      null
    );
    
    setConversations(savedConversations);
    if (savedCurrentConversation) {
      setCurrentConversation(savedCurrentConversation);
    }
  }, []);
  
  // 同步GraphQL数据
  useEffect(() => {
    if (conversationsData?.conversations) {
      setConversations(conversationsData.conversations);
    }
  }, [conversationsData]);
  
  // 自动滚动到底部
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, UI_CONSTANTS.AUTO_SCROLL_DELAY);
  }, []);
  
  // 保存对话到本地存储
  const saveConversationsToLocal = useCallback((convs: Conversation[], current?: Conversation | null) => {
    setLocalStorage(STORAGE_KEYS.CONVERSATIONS, convs);
    if (current !== undefined) {
      setLocalStorage(STORAGE_KEYS.CURRENT_CONVERSATION, current);
    }
  }, []);
  
  // 发送消息
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 创建用户消息
      const userMessage = createMessage(content, 'user', currentConversation?.id);
      
      // 如果没有当前对话，创建新对话
      let conversation = currentConversation;
      if (!conversation) {
        conversation = createNewConversation();
        conversation.title = generateConversationTitle([userMessage]);
        setCurrentConversation(conversation);
      }
      
      // 更新对话消息
      const updatedConversation = {
        ...conversation,
        messages: [...conversation.messages, userMessage],
        updatedAt: new Date().toISOString()
      };
      
      setCurrentConversation(updatedConversation);
      
      // 更新对话列表
      const updatedConversations = conversations.some(c => c.id === conversation.id)
        ? conversations.map(c => c.id === conversation.id ? updatedConversation : c)
        : [updatedConversation, ...conversations];
      
      setConversations(updatedConversations);
      saveConversationsToLocal(updatedConversations, updatedConversation);
      
      scrollToBottom();
      
      // 显示打字指示器
      setIsTyping(true);
      
      // 调用GraphQL变更或直接调用API
      let response: ChatResponse;
      
      try {
        // 尝试使用GraphQL
        const result = await sendMessageMutation({
          variables: {
            message: content,
            conversationId: conversation.id
          }
        });
        
        if (result.data?.sendMessage) {
          response = {
            message: result.data.sendMessage.message.content,
            conversationId: result.data.sendMessage.message.conversationId,
            timestamp: result.data.sendMessage.message.timestamp,
            model: 'deepseek-chat'
          };
        } else {
          throw new Error('GraphQL返回数据为空');
        }
      } catch (gqlError) {
        console.log('GraphQL请求失败，尝试直接调用API:', gqlError);
        
        // 如果GraphQL失败，直接调用REST API
        const apiResponse = await fetch(`${DEFAULT_CONFIG.API_URL}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: content,
            conversationId: conversation.id
          } as ChatRequest)
        });
        
        if (!apiResponse.ok) {
          throw new Error(`HTTP error! status: ${apiResponse.status}`);
        }
        
        response = await apiResponse.json();
      }
      
      // 创建AI回复消息
      const assistantMessage = createMessage(
        response.message, 
        'assistant', 
        response.conversationId
      );
      
      // 更新对话
      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage],
        updatedAt: new Date().toISOString()
      };
      
      setCurrentConversation(finalConversation);
      
      const finalConversations = updatedConversations.map(c => 
        c.id === conversation.id ? finalConversation : c
      );
      
      setConversations(finalConversations);
      saveConversationsToLocal(finalConversations, finalConversation);
      
      scrollToBottom();
      
    } catch (err) {
      console.error('发送消息失败:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [currentConversation, conversations, sendMessageMutation, saveConversationsToLocal, scrollToBottom]);
  
  // 创建新对话
  const createConversation = useCallback(() => {
    const newConversation = createNewConversation();
    setCurrentConversation(newConversation);
    setError(null);
  }, []);
  
  // 选择对话
  const selectConversation = useCallback((conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      setLocalStorage(STORAGE_KEYS.CURRENT_CONVERSATION, conversation);
      setError(null);
    }
  }, [conversations]);
  
  // 删除对话
  const deleteConversation = useCallback((conversationId: string) => {
    const updatedConversations = conversations.filter(c => c.id !== conversationId);
    setConversations(updatedConversations);
    
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(null);
      setLocalStorage(STORAGE_KEYS.CURRENT_CONVERSATION, null);
    }
    
    saveConversationsToLocal(updatedConversations);
  }, [conversations, currentConversation, saveConversationsToLocal]);
  
  // 清除错误
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