import { gql } from '@apollo/client';

// 获取所有对话
export const GET_CONVERSATIONS = gql`
  query GetConversations {
    conversations {
      id
      title
      createdAt
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

// 获取单个对话
export const GET_CONVERSATION = gql`
  query GetConversation($id: ID!) {
    conversation(id: $id) {
      id
      title
      createdAt
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

// 获取用户设置
export const GET_USER_PREFERENCES = gql`
  query GetUserPreferences {
    userPreferences {
      theme
      language
      autoSave
      showTimestamp
      enableNotifications
    }
  }
`;

// 搜索对话
export const SEARCH_CONVERSATIONS = gql`
  query SearchConversations($query: String!) {
    searchConversations(query: $query) {
      id
      title
      createdAt
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

// 获取对话统计
export const GET_CONVERSATION_STATS = gql`
  query GetConversationStats {
    conversationStats {
      totalConversations
      totalMessages
      averageMessagesPerConversation
      mostActiveDay
    }
  }
`;