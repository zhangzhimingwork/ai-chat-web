# AI Chat Web

现代化的AI聊天应用前端，基于React + TypeScript + Tailwind CSS构建。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量示例文件并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置API地址：

```env
REACT_APP_API_URL=http://localhost:8787
REACT_APP_GRAPHQL_URL=http://localhost:8787/graphql
```

### 3. 启动开发服务器

```bash
npm start
```

应用将在 http://localhost:3000 启动

### 4. 构建生产版本

```bash
npm run build
```

## ✨ 功能特性

- 🎨 现代化UI设计，响应式布局
- 💬 实时AI聊天对话
- 🌙 深色/浅色主题切换
- 💾 本地数据持久化
- 📱 移动端友好
- ⚡ TypeScript类型安全
- 🎯 组件化架构

## 🛠️ 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Apollo Client** - GraphQL客户端
- **Heroicons** - 图标库

## 📁 项目结构

```
src/
├── components/     # React组件
├── hooks/         # 自定义Hooks
├── types/         # TypeScript类型
├── utils/         # 工具函数
├── services/      # 服务层
└── graphql/       # GraphQL相关
```

## 🔧 开发说明

确保你的开发环境已安装：
- Node.js 16+
- npm 或 yarn

## 📝 许可证

MIT License
