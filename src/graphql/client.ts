import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// 创建HTTP链接
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || '/graphql',
});

// 认证链接
const authLink = setContext((_, { headers }) => {
  // 从localStorage获取认证token
  const token = localStorage.getItem('auth_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// 错误处理链接
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    
    // 处理认证错误
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      // 清除过期的token
      localStorage.removeItem('auth_token');
      // 可以在这里触发重新登录
    }
  }
});

// 创建Apollo客户端
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // 缓存策略：每次都重新获取聊天结果
          chat: {
            merge: false,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
});