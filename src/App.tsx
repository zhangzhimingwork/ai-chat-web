import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql/client';
import { Header, Sidebar, ChatContainer } from './components';
import { useChat, useTheme } from './hooks';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEYS } from './utils/constants';

function App() {
  const { mounted } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    STORAGE_KEYS.USER_PREFERENCES + '_sidebar', 
    false
  );
  
  const {
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
  } = useChat();

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    createConversation();
    setSidebarOpen(false); // 在移动端创建新对话后关闭侧边栏
  };

  // 防止hydration错误
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* 侧边栏 */}
        <Sidebar
          conversations={conversations}
          currentConversation={currentConversation}
          onSelectConversation={selectConversation}
          onNewConversation={handleNewChat}
          onDeleteConversation={deleteConversation}
          onClose={handleCloseSidebar}
          isOpen={sidebarOpen}
        />

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 头部 */}
          <Header
            onToggleSidebar={handleToggleSidebar}
            onNewChat={handleNewChat}
            sidebarOpen={sidebarOpen}
          />

          {/* 聊天容器 */}
          <div className="flex-1 overflow-hidden">
            <ChatContainer
              conversation={currentConversation}
              isLoading={isLoading}
              isTyping={isTyping}
              error={error}
              onSendMessage={sendMessage}
              onClearError={clearError}
              messagesEndRef={messagesEndRef}
            />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;