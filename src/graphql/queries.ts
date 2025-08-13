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
        conversationId
      }
    }
  }
`;

// 获取对话历史(从后端API)
export const GET_CONVERSATION_HISTORY = gql`
  query GetConversationHistory($conversationId: String!) {
    conversationHistory(conversationId: $conversationId) {
      id
      messages {
        id
        role
        content
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`;