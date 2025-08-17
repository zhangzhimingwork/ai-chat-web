// 基础类型定义
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

// API相关类型
export interface ChatRequest {
  message: string;
  conversationId?: string;
  model?: string;
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  timestamp: string;
  model: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// UI状态类型
export interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
}

// 主题类型
export type Theme = 'light' | 'dark';

// 用户偏好设置
export interface UserPreferences {
  theme: Theme;
  language: string;
  autoSave: boolean;
  showTimestamp: boolean;
  enableNotifications: boolean;
}

// GraphQL相关类型
export interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: string[];
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: GraphQLError[];
}

// Hook返回类型
export interface UseChatReturn {
  currentConversation: Conversation | null;
  conversations: Conversation[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  sendMessage: (message: string, systemPrompt?: string) => Promise<void>;
  createConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  clearError: () => void;
  retryLastMessage: () => void; // 🔧 新增
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface UseThemeReturn {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  // 🔧 新增：GraphQL 响应的额外信息
  lastUsage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  lastModel?: string;
}

// 修复useLocalStorage返回类型
export type UseLocalStorageReturn<T> = [
  T,
  (value: T) => void,
  () => void
];