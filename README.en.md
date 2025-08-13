# AI Chat Web

AI-powered chat frontend application built with React + TypeScript + GraphQL

[简体中文](./README.md) | **English**

## 🚀 Features

- 🎨 Modern UI design inspired by ChatGPT
- 💬 Real-time chat conversations
- 🧠 AI-powered responses
- 📱 Responsive design with mobile support
- 🔄 GraphQL data queries and caching
- 📝 TypeScript type safety
- 🎯 Session management
- ⚡ Fast response
- 🌙 Dark/light theme toggle
- 📋 Message copy functionality
- 🔍 Conversation history management
- 💾 Local data persistence

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Data Layer**: Apollo Client + GraphQL
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Build Tool**: Create React App
- **Testing**: Jest + React Testing Library
- **Code Quality**: Prettier + ESLint

## 📦 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file and configure the backend service URL:
```env
REACT_APP_API_URL=https://your-chat-service.workers.dev
REACT_APP_GRAPHQL_URL=https://your-chat-service.workers.dev/graphql
```

### Start Development Server
```bash
npm start
```

The application will start at http://localhost:3000

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Chat/            # Chat-related components
│   ├── UI/              # Common UI components
│   └── Layout/          # Layout components
├── graphql/             # GraphQL related
│   ├── queries/         # Queries
│   ├── mutations/       # Mutations
│   └── client.ts        # Apollo Client config
├── types/               # TypeScript type definitions
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── services/            # Service layer
└── App.tsx              # Main app component
```

## 🔧 Configuration

### GraphQL Client
The application uses Apollo Client for GraphQL data management, supporting:
- Intelligent caching
- Real-time updates
- Error handling
- Loading state management

### Backend Integration
Integrates with [chat-service](https://github.com/zhangzhimingwork/chat-service) backend, supporting:
- Chat message sending
- Conversation history queries
- Session management

## 🎨 UI Design

Modern design inspired by ChatGPT:
- Clean chat interface
- Smooth message animations
- Elegant loading states
- Responsive layout
- Dark/light theme support

## 📱 Mobile Support

Fully optimized for mobile devices:
- Touch-friendly interactions
- Mobile-optimized layout
- Adaptive to different screen sizes
- Mobile keyboard adaptation

## 🧪 Testing

Comprehensive test suite including:
- Unit tests
- Component tests
- Integration tests
- End-to-end tests (planned)

Run tests:
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:ci

# Type checking
npm run type-check

# Code linting
npm run lint
```

## 📚 Development Guide

### Code Standards
- Use TypeScript for type-safe development
- Follow ESLint and Prettier configurations
- Use functional components
- Encapsulate logic with custom hooks

### Contributing
1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

See detailed [Contributing Guide](./docs/CONTRIBUTING.md)

## 📖 Documentation

- [API Documentation](./docs/API.md) - Backend API specification
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deploy to various platforms
- [Contributing Guide](./docs/CONTRIBUTING.md) - How to contribute
- [Changelog](./docs/CHANGELOG.md) - Version update records

## 🚀 Deployment

After building, the application can be deployed to any static hosting service:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

See detailed [Deployment Guide](./docs/DEPLOYMENT.md)

## 🔗 Related Projects

- [Chat Service](https://github.com/zhangzhimingwork/chat-service) - Backend API service

## 📄 License

This project is open source under [MIT License](./LICENSE).

## 🤝 Contributors

Thanks to all developers who contributed to this project!

- [@zhangzhimingwork](https://github.com/zhangzhimingwork) - Project creator and main maintainer

## 🐛 Issue Feedback

If you find issues or have feature suggestions:
1. Check [existing Issues](https://github.com/zhangzhimingwork/ai-chat-web/issues)
2. Create new [Issue](https://github.com/zhangzhimingwork/ai-chat-web/issues/new)

## ⭐ Support the Project

If this project helps you, please give it a Star ⭐

---

[简体中文](./README.md) | **English**