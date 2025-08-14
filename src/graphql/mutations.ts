import { gql } from '@apollo/client';

// 发送消息
export const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!, $conversationId: ID) {
    sendMessage(message: $message, conversationId: $conversationId) {
      message {
        id
        content
        role
        timestamp
      }
      conversation {
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
  }
`;

// 创建新对话
export const CREATE_CONVERSATION = gql`
  mutation CreateConversation($title: String) {
    createConversation(title: $title) {
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

// 删除对话
export const DELETE_CONVERSATION = gql`
  mutation DeleteConversation($id: ID!) {
    deleteConversation(id: $id) {
      success
      message
    }
  }
`;

// 更新对话标题
export const UPDATE_CONVERSATION_TITLE = gql`
  mutation UpdateConversationTitle($id: ID!, $title: String!) {
    updateConversationTitle(id: $id, title: $title) {
      id
      title
      updatedAt
    }
  }
`;

// 清空对话消息
export const CLEAR_CONVERSATION = gql`
  mutation ClearConversation($id: ID!) {
    clearConversation(id: $id) {
      id
      title
      messages {
        id
        content
        role
        timestamp
      }
    }
  }
`;

// 更新用户设置
export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences($preferences: UserPreferencesInput!) {
    updateUserPreferences(preferences: $preferences) {
      theme
      language
      autoSave
      showTimestamp
      enableNotifications
    }
  }
`;

// 导出对话数据
export const EXPORT_CONVERSATIONS = gql`
  mutation ExportConversations {
    exportConversations {
      data
      filename
      mimeType
    }
  }
`;

// 导入对话数据
export const IMPORT_CONVERSATIONS = gql`
  mutation ImportConversations($data: String!) {
    importConversations(data: $data) {
      success
      message
      importedCount
    }
  }
`;