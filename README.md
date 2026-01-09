# 🛍️ AppMart - GitHub Repository Explorer

<div align="center">

**A beautiful React Native mobile app for discovering and exploring GitHub repositories**

[![React Native](https://img.shields.io/badge/React%20Native-0.76-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000000.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

[Features](#-features) • [Screenshots](#-screenshots) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 About

**AppMart** is a production-ready React Native application built with Expo that brings GitHub's vast repository ecosystem to your mobile device. Discover trending projects, search repositories, and manage your favorites with a stunning glassmorphism UI and smooth animations.

### **Why AppMart?**

- 💎 **Glassmorphism UI**: Modern blurred glass effects and premium design
- 🌓 **Auto Dark Mode**: Seamless light/dark theme switching
- ⚡ **Smooth Animations**: 60 FPS transitions and micro-interactions
- 📱 **Mobile-First**: Built specifically for mobile, not a web port
- 💾 **Offline Favorites**: Save and access favorites without internet
- 🔍 **Smart Search**: Real-time search with debouncing
- 🎨 **8 Categories**: Curated discovery by platform and technology

---

## ✨ Features

### **Discovery & Browsing**
- 🔥 Browse trending repositories by category
- 📊 100 repositories per category with pagination
- 🎯 8 curated categories (Android, iOS, React Native, Flutter, CLI, AI/ML, Web)
- 💫 Animated background bubbles and smooth transitions
- 🔄 Pull-to-refresh on all screens

### **Smart Search**
- 🔍 Real-time search with 400ms debouncing
- 📈 50+ search results per query
- ⌨️ Keyboard-friendly interface
- 🎭 Loading states with animations

### **Repository Details**
- 🎨 Beautiful banner with blurred avatar background
- 📊 Stats cards (stars, forks, watchers, issues)
- 🏷️ Clickable topic tags
- 📝 README preview (800 characters)
- ℹ️ Info section (language, license, branch, last update)
- 🔗 Direct link to view on GitHub

### **Favorites Management**
- ❤️ Save favorite repositories
- 💾 Persistent offline storage with AsyncStorage
- 🗑️ Quick clear all option
- 📱 Beautiful empty states

### **UI/UX Excellence**
- Favorite/bookmark apps
- Search history
- Offline mode
- Dark/Light theme
- Native share functionality

---

## 📸 Screenshots

> *Coming soon - Screenshots will be added once UI is implemented*

---

## 🛠️ Tech Stack

### **Core**
- **React Native** 0.73+ - Cross-platform mobile framework
- **TypeScript** 5.4+ - Type safety and better DX
- **React Navigation** 6.x - Native navigation
- **NativeWind** - Tailwind CSS for React Native

### **State Management**
- **Zustand** - Lightweight state management
- **TanStack Query v5** - Server state & caching
- **AsyncStorage** - Local data persistence

### **UI & Animations**
- **React Native Reanimated** - 60 FPS animations
- **React Native Gesture Handler** - Touch gestures
- **react-native-fast-image** - Optimized image loading
- **react-native-vector-icons** - Icon library

### **Data & API**
- **Axios** - HTTP client
- **GitHub REST API** - Primary data source
- **react-native-markdown-display** - Render READMEs

### **Development**
- **ESLint + Prettier** - Code quality
- **Jest** - Unit testing
- **React Native Testing Library** - Component testing
- **Detox** - E2E testing

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18.x or higher
- npm or yarn
- React Native CLI
- Xcode 14+ (for iOS)
- Android Studio (for Android)

### **Installation**

1. **Clone the repository**

```bash
git clone https://github.com/your-username/appforge-mobile.git
cd appforge-mobile
```

2. **Install dependencies**

```bash
npm install

# iOS only (macOS)
cd ios && pod install && cd ..
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your GitHub token (optional, for higher rate limits):

```env
GITHUB_TOKEN=your_github_personal_access_token
```

4. **Run the app**

```bash
# iOS
npm run ios

# Android
npm run android
```

For detailed setup instructions, see [GETTING_STARTED.md](./docs/GETTING_STARTED.md).

---

## 📂 Project Structure

```
appforge-mobile/
├── src/
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # Screen components
│   ├── components/      # Reusable components
│   ├── services/        # API & services
│   ├── hooks/           # Custom hooks
│   ├── store/           # State management
│   ├── types/           # TypeScript types
│   ├── utils/           # Utilities
│   ├── theme/           # Theme configuration
│   └── assets/          # Images, fonts
├── android/             # Android native code
├── ios/                 # iOS native code
├── docs/                # Documentation
└── __tests__/          # Test files
```

---

## 📚 Documentation

Comprehensive documentation is available in the [docs/](./docs) directory:

- **[CONCEPT.md](./docs/CONCEPT.md)** - Project vision and goals
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Technical architecture
- **[PAGES.md](./docs/PAGES.md)** - Screen specifications
- **[SECURITY.md](./docs/SECURITY.md)** - Security guidelines
- **[GETTING_STARTED.md](./docs/GETTING_STARTED.md)** - Setup guide

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **GitHub API** - For providing the data
- **React Native Community** - For the amazing ecosystem
- **Open Source Contributors** - For making this possible

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/your-username/appforge-mobile/issues)
- **Discussions**: [Ask questions or share ideas](https://github.com/your-username/appforge-mobile/discussions)
- **Email**: support@appforge.com
- **Twitter**: [@AppForge](https://twitter.com/appforge)

---

## 🗺️ Roadmap

### **Phase 1: MVP** (Q1 2026)
- [x] Project setup and architecture
- [ ] Core navigation
- [ ] Home screen with featured apps
- [ ] Apps list with search
- [ ] App detail screen
- [ ] Favorites functionality
- [ ] Settings and theme switching

### **Phase 2: Enhanced Features** (Q2 2026)
- [ ] Advanced search and filters
- [ ] Categories and trending
- [ ] Release management
- [ ] Push notifications
- [ ] Offline mode
- [ ] Share functionality

### **Phase 3: Community** (Q3 2026)
- [ ] User accounts (optional)
- [ ] App submission
- [ ] Comments and ratings
- [ ] Collections and lists

### **Phase 4: Advanced** (Q4 2026)
- [ ] Multi-language support
- [ ] Analytics and insights
- [ ] AI-powered recommendations
- [ ] Cross-device sync

---

<div align="center">

**Made with ❤️ by the AppForge Team**

⭐ Star us on GitHub if you find this project useful!

</div>
