// API端点
export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  CONVERSATIONS: '/api/conversations',
  HEALTH: '/'
} as const;

// GraphQL操作
export const GRAPHQL_OPERATIONS = {
  SEND_MESSAGE: 'SendMessage',
  GET_CONVERSATIONS: 'GetConversations',
  GET_CONVERSATION: 'GetConversation',
  DELETE_CONVERSATION: 'DeleteConversation'
} as const;

// 本地存储键
export const STORAGE_KEYS = {
  CONVERSATIONS: 'ai_chat_conversations',
  CURRENT_CONVERSATION: 'ai_chat_current_conversation',
  USER_PREFERENCES: 'ai_chat_user_preferences',
  THEME: 'ai_chat_theme'
} as const;

// UI常量
export const UI_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 4000,
  TYPING_INDICATOR_DELAY: 500,
  AUTO_SCROLL_DELAY: 100,
  SIDEBAR_WIDTH: 260,
  MESSAGE_ANIMATION_DURATION: 300
} as const;

// 错误代码
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  INVALID_MESSAGE: 'INVALID_MESSAGE',
  CONVERSATION_NOT_FOUND: 'CONVERSATION_NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
} as const;

// 默认配置
export const DEFAULT_CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8787',
  GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:8787/graphql',
  THEME: 'light' as const,
  LANGUAGE: 'zh-CN' as const
} as const;

// 主题配置
export const THEME_CONFIG = {
  light: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    border: '#e5e7eb'
  },
  dark: {
    primary: '#60a5fa',
    secondary: '#9ca3af',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    border: '#374151'
  }
} as const;