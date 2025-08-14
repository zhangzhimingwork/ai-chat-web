import { gql } from '@apollo/client';

// 消息相关订阅
export const MESSAGE_ADDED = gql`
  subscription MessageAdded($conversationId: ID!) {
    messageAdded(conversationId: $conversationId) {
      id
      content
      role
      timestamp
    }
  }
`;

// 对话状态变化订阅
export const CONVERSATION_UPDATED = gql`
  subscription ConversationUpdated($conversationId: ID!) {
    conversationUpdated(conversationId: $conversationId) {
      id
      title
      updatedAt
      messages {
        id
        content
        role
        timestamp
      }
    }
  }
`;

// 用户设置变化订阅
export const USER_PREFERENCES_UPDATED = gql`
  subscription UserPreferencesUpdated {
    userPreferencesUpdated {
      theme
      language
      autoSave
      showTimestamp
      enableNotifications
    }
  }
`;

// 系统通知订阅
export const SYSTEM_NOTIFICATION = gql`
  subscription SystemNotification {
    systemNotification {
      id
      type
      title
      message
      timestamp
    }
  }
`;