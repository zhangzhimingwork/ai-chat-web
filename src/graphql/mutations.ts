import { gql } from '@apollo/client';

// 发送消息
export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $message: String!
    $conversationId: String
    $systemPrompt: String
  ) {
    sendMessage(
      message: $message
      conversationId: $conversationId
      systemPrompt: $systemPrompt
    ) {
      message {
        id
        content
        role
        timestamp
        conversationId
      }
      conversation {
        id
        title
        messages {
          id
          content
          role
          timestamp
        }
        createdAt
        updatedAt
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
      messages {
        id
        content
        role
        timestamp
      }
      createdAt
      updatedAt
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