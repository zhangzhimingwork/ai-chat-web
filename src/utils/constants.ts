// UI相关常量
export const UI_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 4000,
  MAX_CONVERSATION_TITLE_LENGTH: 100,
  TYPING_ANIMATION_DELAY: 150,
  AUTO_SAVE_DELAY: 1000,
  SCROLL_BEHAVIOR: 'smooth' as ScrollBehavior,
  DEBOUNCE_DELAY: 300
};

// 存储键名
export const STORAGE_KEYS = {
  CONVERSATIONS: 'ai_chat_conversations',
  CURRENT_CONVERSATION: 'ai_chat_current_conversation',
  USER_PREFERENCES: 'ai_chat_user_preferences',
  THEME: 'ai_chat_theme',
  API_SETTINGS: 'ai_chat_api_settings'
};

// API相关常量
export const API_CONSTANTS = {
  DEFAULT_MODEL: 'deepseek-chat',
  REQUEST_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000
};

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  API_ERROR: 'API调用失败，请稍后重试',
  INVALID_INPUT: '输入内容无效，请检查后重试',
  MESSAGE_TOO_LONG: '消息长度超出限制',
  CONVERSATION_NOT_FOUND: '对话不存在',
  SAVE_FAILED: '保存失败，请重试',
  LOAD_FAILED: '加载失败，请刷新页面'
};

// 成功消息
export const SUCCESS_MESSAGES = {
  MESSAGE_SENT: '消息发送成功',
  CONVERSATION_CREATED: '新对话已创建',
  CONVERSATION_DELETED: '对话已删除',
  SETTINGS_SAVED: '设置已保存',
  DATA_EXPORTED: '数据导出成功',
  DATA_IMPORTED: '数据导入成功'
};

// 默认配置
export const DEFAULT_CONFIG = {
  theme: 'light' as 'light' | 'dark',
  language: 'zh-CN',
  autoSave: true,
  showTimestamp: true,
  enableNotifications: false,
  maxConversations: 50
};