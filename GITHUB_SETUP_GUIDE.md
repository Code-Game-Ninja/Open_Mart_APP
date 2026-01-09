# 📱 AppForge Mobile - React Native Setup & Development Guide

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-0.73+-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)

**A comprehensive mobile marketplace for discovering and managing open-source applications**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
  - [Core Framework](#core-framework)
  - [UI & Styling](#ui--styling)
  - [State Management](#state-management)
  - [API & Data](#api--data)
  - [Native Features](#native-features)
  - [Development Tools](#development-tools)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Environment Setup](#-environment-setup)
- [Running the App](#-running-the-app)
- [Testing](#-testing)
- [Building for Production](#-building-for-production)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

🔍 **Smart Discovery** - Advanced search with real-time GitHub API integration  
⭐ **Favorites System** - Save and manage your favorite apps  
📊 **Rich Details** - Complete app information with README, releases, and stats  
🌓 **Dark Mode** - Beautiful dark/light theme with system preference support  
📱 **Offline Mode** - Cache data for offline browsing  
🔔 **Push Notifications** - Get notified about trending apps and new releases  
🎨 **Smooth Animations** - Fluid UI with React Native Reanimated  
🚀 **High Performance** - Optimized lists, images, and navigation  

---

## 🛠 Tech Stack

### **Core Framework**

<table>
<tr>
<td align="center" width="200">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" width="50" height="50" /><br>
<b>React Native 0.73+</b><br>
<sub>Cross-platform mobile framework</sub>
</td>
<td align="center" width="200">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" width="50" height="50" /><br>
<b>TypeScript 5.4+</b><br>
<sub>Type-safe development</sub>
</td>
<td align="center" width="200">
<img src="https://reactnavigation.org/img/spiro.svg" width="50" height="50" /><br>
<b>React Navigation 6</b><br>
<sub>Routing and navigation</sub>
</td>
</tr>
</table>

```json
{
  "react": "18.2.0",
  "react-native": "0.73.0",
  "typescript": "^5.4.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11"
}
```

---

### **UI & Styling**

<table>
<tr>
<td align="center" width="200">
<img src="https://www.tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" width="50" height="50" /><br>
<b>NativeWind 4.0</b><br>
<sub>Tailwind CSS for RN</sub>
</td>
<td align="center" width="200">
<img src="https://docs.swmansion.com/react-native-reanimated/img/logo.svg" width="50" height="50" /><br>
<b>Reanimated 3.x</b><br>
<sub>Smooth animations</sub>
</td>
<td align="center" width="200">
<img src="https://avatars.githubusercontent.com/u/29647600?s=200&v=4" width="50" height="50" /><br>
<b>Gesture Handler 2</b><br>
<sub>Touch interactions</sub>
</td>
</tr>
</table>

```json
{
  "nativewind": "^4.0.1",
  "tailwindcss": "^3.4.0",
  "react-native-reanimated": "^3.6.1",
  "react-native-gesture-handler": "^2.14.1",
  "react-native-vector-icons": "^10.0.3",
  "react-native-fast-image": "^8.6.3"
}
```

**Key Features:**
- 🎨 Utility-first styling with Tailwind CSS
- ⚡ 60 FPS animations with native thread
- 👆 Advanced gesture recognition
- 🖼️ Optimized image loading and caching

---

### **State Management**

<table>
<tr>
<td align="center" width="200">
<img src="https://raw.githubusercontent.com/pmndrs/zustand/main/docs/bear.jpg" width="50" height="50" /><br>
<b>Zustand 4.x</b><br>
<sub>Simple state management</sub>
</td>
<td align="center" width="200">
<img src="https://tanstack.com/_build/assets/logo-color-600w-Bx4vtR8J.png" width="50" height="50" /><br>
<b>TanStack Query 5</b><br>
<sub>Server state management</sub>
</td>
<td align="center" width="200">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/redux/redux.png" width="50" height="50" /><br>
<b>AsyncStorage</b><br>
<sub>Persistent storage</sub>
</td>
</tr>
</table>

```json
{
  "zustand": "^4.4.7",
  "@tanstack/react-query": "^5.17.9",
  "@react-native-async-storage/async-storage": "^1.21.0",
  "react-native-encrypted-storage": "^4.0.3"
}
```

**Architecture:**
```typescript
// Client State (Zustand)
- User preferences
- Theme settings
- Favorites list
- UI state

// Server State (React Query)
- API data
- Automatic caching
- Background refetching
- Optimistic updates
```

---

### **API & Data**

<table>
<tr>
<td align="center" width="200">
<img src="https://axios-http.com/assets/logo.svg" width="50" height="50" /><br>
<b>Axios</b><br>
<sub>HTTP client</sub>
</td>
<td align="center" width="200">
<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="50" height="50" /><br>
<b>GitHub API v3</b><br>
<sub>Data source</sub>
</td>
<td align="center" width="200">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/markdown/markdown.png" width="50" height="50" /><br>
<b>Markdown Display</b><br>
<sub>README rendering</sub>
</td>
</tr>
</table>

```json
{
  "axios": "^1.6.5",
  "react-native-markdown-display": "^7.0.0",
  "react-native-syntax-highlighter": "^2.1.0",
  "date-fns": "^3.0.6"
}
```

**API Integration:**
```typescript
GitHub REST API v3
├── Search Repositories
├── Get Repository Details
├── Fetch README Content
├── Get Releases
└── List Contributors

Rate Limits:
- Authenticated: 5,000 requests/hour
- Unauthenticated: 60 requests/hour
```

---

### **Native Features**

<table>
<tr>
<td align="center" width="150">
<b>📱 WebView</b><br>
<sub>In-app browser</sub>
</td>
<td align="center" width="150">
<b>🔔 Notifications</b><br>
<sub>Push alerts</sub>
</td>
<td align="center" width="150">
<b>📤 Share</b><br>
<sub>Native sharing</sub>
</td>
<td align="center" width="150">
<b>📂 File System</b><br>
<sub>Downloads</sub>
</td>
</tr>
</table>

```json
{
  "react-native-webview": "^13.6.4",
  "@notifee/react-native": "^7.8.2",
  "react-native-share": "^10.0.2",
  "react-native-fs": "^2.20.0",
  "react-native-permissions": "^4.0.3",
  "@react-native-community/linking": "^1.0.0"
}
```

---

### **Development Tools**

<table>
<tr>
<td align="center" width="200">
<img src="https://jestjs.io/img/jest.png" width="50" height="50" /><br>
<b>Jest</b><br>
<sub>Unit testing</sub>
</td>
<td align="center" width="200">
<img src="https://testing-library.com/img/octopus-64x64.png" width="50" height="50" /><br>
<b>Testing Library</b><br>
<sub>Integration tests</sub>
</td>
<td align="center" width="200">
<img src="https://avatars.githubusercontent.com/u/13532094?s=200&v=4" width="50" height="50" /><br>
<b>Detox</b><br>
<sub>E2E testing</sub>
</td>
</tr>
</table>

```json
{
  "jest": "^29.7.0",
  "@testing-library/react-native": "^12.4.3",
  "detox": "^20.16.1",
  "reactotron-react-native": "^5.0.4",
  "eslint": "^8.56.0",
  "prettier": "^3.1.1"
}
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### **Required Software**

| Software | Version | Download |
|----------|---------|----------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **npm/yarn** | Latest | Included with Node.js |
| **Watchman** | Latest | [facebook.github.io/watchman](https://facebook.github.io/watchman/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

### **For iOS Development** (macOS only)

```bash
# Required
- Xcode 14.3 or newer
- Xcode Command Line Tools
- CocoaPods 1.13+
- iOS Simulator or physical device

# Installation
xcode-select --install
sudo gem install cocoapods
```

### **For Android Development**

```bash
# Required
- Android Studio (latest)
- Android SDK (API 33+)
- Java Development Kit (JDK 17)
- Android Emulator or physical device

# Environment Variables (add to ~/.zshrc or ~/.bashrc)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

## 🚀 Quick Start

### **1. Clone the Repository**

```bash
# Clone the repo
git clone https://github.com/Code-Game-Ninja/appforge-mobile.git
cd appforge-mobile

# Or use GitHub CLI
gh repo clone Code-Game-Ninja/appforge-mobile
```

### **2. Install Dependencies**

```bash
# Install Node modules
npm install

# Or with Yarn
yarn install

# Install iOS Pods (macOS only)
cd ios && pod install && cd ..
```

### **3. Setup Environment Variables**

```bash
# Copy environment example
cp .env.example .env

# Edit .env file
nano .env
```

```bash
# .env Configuration
GITHUB_TOKEN=ghp_your_github_personal_access_token_here
API_URL=https://api.github.com
ENVIRONMENT=development
```

**Get GitHub Token:**
1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. Select scopes: `public_repo`, `read:user`
4. Copy token to `.env` file

### **4. Run the App**

```bash
# Start Metro bundler
npm start

# Run on iOS (in new terminal)
npm run ios

# Run on Android (in new terminal)
npm run android

# Or use specific device/simulator
npm run ios -- --simulator="iPhone 15 Pro"
npm run android -- --deviceId=emulator-5554
```

---

## 📂 Project Structure

```
appforge-mobile/
│
├── 📱 src/                          # Source code
│   ├── 🗺️  navigation/              # Navigation configuration
│   │   ├── AppNavigator.tsx         # Root navigator
│   │   ├── TabNavigator.tsx         # Bottom tab navigation
│   │   ├── StackNavigator.tsx       # Stack navigation
│   │   └── types.ts                 # Navigation types
│   │
│   ├── 📱 screens/                  # Screen components
│   │   ├── Home/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── components/          # Screen-specific components
│   │   │   └── hooks/               # Screen-specific hooks
│   │   ├── Apps/
│   │   │   ├── AppsListScreen.tsx
│   │   │   └── AppDetailScreen.tsx
│   │   ├── Search/
│   │   ├── Categories/
│   │   ├── Favorites/
│   │   └── Settings/
│   │
│   ├── 🧩 components/               # Reusable components
│   │   ├── common/                  # Generic components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Loading.tsx
│   │   ├── apps/                    # App-specific components
│   │   │   ├── AppCard.tsx
│   │   │   ├── AppListItem.tsx
│   │   │   └── AppStats.tsx
│   │   └── layout/                  # Layout components
│   │       ├── Header.tsx
│   │       └── TabBar.tsx
│   │
│   ├── 🔧 services/                 # External services
│   │   ├── api/
│   │   │   ├── github.ts            # GitHub API client
│   │   │   ├── apps.ts              # Apps API
│   │   │   └── client.ts            # Base HTTP client
│   │   ├── storage/
│   │   │   ├── favorites.ts         # Favorites storage
│   │   │   └── settings.ts          # Settings storage
│   │   └── notifications/
│   │       └── pushNotifications.ts
│   │
│   ├── 🪝 hooks/                    # Custom React hooks
│   │   ├── useApps.ts
│   │   ├── useAppDetails.ts
│   │   ├── useSearch.ts
│   │   ├── useFavorites.ts
│   │   └── useTheme.ts
│   │
│   ├── 🗄️  store/                   # State management
│   │   ├── slices/
│   │   │   ├── favoritesStore.ts    # Favorites state
│   │   │   ├── settingsStore.ts     # Settings state
│   │   │   └── userStore.ts         # User state
│   │   └── index.ts
│   │
│   ├── 📝 types/                    # TypeScript types
│   │   ├── app.ts
│   │   ├── github.ts
│   │   ├── navigation.ts
│   │   └── common.ts
│   │
│   ├── 🛠️  utils/                   # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   │
│   ├── 🎨 theme/                    # Theme configuration
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   └── 📦 assets/                   # Static assets
│       ├── images/
│       ├── fonts/
│       └── animations/
│
├── 🤖 android/                      # Android native code
├── 🍎 ios/                          # iOS native code
├── 🧪 __tests__/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── 📝 .env.example                  # Environment variables template
├── 📱 app.json                      # App configuration
├── 🔧 babel.config.js               # Babel configuration
├── 📦 metro.config.js               # Metro bundler config
├── 📘 tsconfig.json                 # TypeScript config
├── 🧪 jest.config.js                # Jest configuration
├── 🎨 tailwind.config.js            # Tailwind CSS config
└── 📋 package.json                  # Dependencies
```

---

## 💻 Development Workflow

### **Code Quality Tools**

#### **1. ESLint - Code Linting**

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Lint specific files
npx eslint src/screens/Home/*.tsx
```

```json
// .eslintrc.js
module.exports = {
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
```

#### **2. Prettier - Code Formatting**

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

```json
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'always'
};
```

#### **3. TypeScript - Type Checking**

```bash
# Run type checking
npm run type-check

# Watch mode
npm run type-check:watch
```

### **Development Scripts**

```json
{
  "scripts": {
    "start": "react-native start",
    "ios": "react-native run-ios",
    "android": "react-native run-android",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json}\"",
    "type-check": "tsc --noEmit",
    "clean": "react-native-clean-project",
    "pods": "cd ios && pod install && cd ..",
    "android:clean": "cd android && ./gradlew clean && cd ..",
    "android:bundle": "cd android && ./gradlew bundleRelease && cd ..",
    "ios:build": "react-native run-ios --configuration Release"
  }
}
```

---

## 🌍 Environment Setup

### **Environment Files**

Create different environment files for each stage:

```bash
.env.development    # Development environment
.env.staging        # Staging environment
.env.production     # Production environment
```

### **Development Environment**

```bash
# .env.development
ENVIRONMENT=development
API_URL=https://api.github.com
GITHUB_TOKEN=ghp_your_dev_token
ENABLE_LOGGING=true
ENABLE_REACTOTRON=true
API_TIMEOUT=30000
```

### **Staging Environment**

```bash
# .env.staging
ENVIRONMENT=staging
API_URL=https://api.github.com
GITHUB_TOKEN=ghp_your_staging_token
ENABLE_LOGGING=true
ENABLE_REACTOTRON=false
API_TIMEOUT=20000
```

### **Production Environment**

```bash
# .env.production
ENVIRONMENT=production
API_URL=https://api.github.com
GITHUB_TOKEN=ghp_your_prod_token
ENABLE_LOGGING=false
ENABLE_REACTOTRON=false
API_TIMEOUT=15000
```

### **Using Environment Variables**

```typescript
import Config from 'react-native-config';

// Access variables
const apiUrl = Config.API_URL;
const githubToken = Config.GITHUB_TOKEN;
const isProduction = Config.ENVIRONMENT === 'production';
```

---

## 📱 Running the App

### **iOS Development**

```bash
# List available simulators
xcrun simctl list devices

# Run on specific simulator
npm run ios -- --simulator="iPhone 15 Pro"

# Run on physical device
npm run ios -- --device="Your iPhone Name"

# Clean build
cd ios
rm -rf build
rm -rf Pods
pod install
cd ..
npm run ios
```

### **Android Development**

```bash
# List available devices
adb devices

# Run on specific device
npm run android -- --deviceId=emulator-5554

# Run on physical device (USB debugging enabled)
npm run android

# Clean build
cd android
./gradlew clean
cd ..
npm run android

# Open Android Studio
open -a "Android Studio" android/
```

### **Metro Bundler Commands**

```bash
# Start bundler
npm start

# Clear cache and start
npm start -- --reset-cache

# In Metro bundler terminal:
# - Press 'r' to reload
# - Press 'd' to open developer menu
# - Press 'i' to run on iOS
# - Press 'a' to run on Android
```

---

## 🧪 Testing

### **Test Structure**

```
__tests__/
├── unit/                    # Unit tests
│   ├── utils/
│   │   ├── formatters.test.ts
│   │   └── validators.test.ts
│   ├── hooks/
│   │   └── useApps.test.ts
│   └── components/
│       └── Button.test.tsx
│
├── integration/             # Integration tests
│   ├── screens/
│   │   ├── HomeScreen.test.tsx
│   │   └── AppDetailScreen.test.tsx
│   └── api/
│       └── github.test.ts
│
└── e2e/                    # End-to-end tests
    ├── app.test.ts
    ├── navigation.test.ts
    └── favorites.test.ts
```

### **Running Tests**

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- formatters.test.ts

# Update snapshots
npm test -- -u
```

### **Unit Test Example**

```typescript
// __tests__/unit/utils/formatters.test.ts

import { formatStars, formatDate } from '@/utils/formatters';

describe('formatters', () => {
  describe('formatStars', () => {
    it('should format thousands with k suffix', () => {
      expect(formatStars(1500)).toBe('1.5k');
      expect(formatStars(999)).toBe('999');
    });

    it('should format millions with M suffix', () => {
      expect(formatStars(1500000)).toBe('1.5M');
      expect(formatStars(2300000)).toBe('2.3M');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toBe('Jan 15, 2024');
    });
  });
});
```

### **Integration Test Example**

```typescript
// __tests__/integration/screens/HomeScreen.test.tsx

import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeScreen } from '@/screens/Home/HomeScreen';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('HomeScreen', () => {
  it('should render featured apps section', async () => {
    const { getByText } = render(<HomeScreen />, { wrapper });
    
    await waitFor(() => {
      expect(getByText('Featured Apps')).toBeTruthy();
    });
  });

  it('should navigate to app detail on card press', async () => {
    const mockNavigate = jest.fn();
    const navigation = { navigate: mockNavigate };
    
    const { getByTestId } = render(
      <HomeScreen navigation={navigation} />,
      { wrapper }
    );

    await waitFor(() => getByTestId('app-card-0'));
    
    fireEvent.press(getByTestId('app-card-0'));
    expect(mockNavigate).toHaveBeenCalledWith('AppDetail', expect.any(Object));
  });
});
```

### **E2E Test Example**

```typescript
// __tests__/e2e/app.test.ts

describe('App Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should display home screen', async () => {
    await expect(element(by.id('home-screen'))).toBeVisible();
    await expect(element(by.text('Featured Apps'))).toBeVisible();
  });

  it('should search for apps', async () => {
    await element(by.id('search-tab')).tap();
    await element(by.id('search-input')).typeText('react');
    await element(by.id('search-button')).tap();
    
    await waitFor(element(by.id('search-results')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should add app to favorites', async () => {
    await element(by.id('app-card-0')).tap();
    await element(by.id('favorite-button')).tap();
    await element(by.text('Back')).tap();
    
    await element(by.id('favorites-tab')).tap();
    await expect(element(by.id('favorites-list'))).toBeVisible();
  });
});
```

---

## 🏗️ Building for Production

### **iOS Production Build**

#### **Step 1: Configure Xcode**

```bash
# Open Xcode workspace
open ios/AppForge.xcworkspace
```

In Xcode:
1. Select target → General
2. Set Bundle Identifier: `com.appforge.mobile`
3. Set Version: `1.0.0`
4. Set Build: `1`
5. Select Signing & Capabilities
6. Select your team and provisioning profile

#### **Step 2: Archive App**

```bash
# Build release version
npm run ios:build

# Or in Xcode:
# Product → Archive
# Organizer → Distribute App → App Store Connect
```

#### **Step 3: Generate IPA**

```bash
# Using Fastlane (optional)
cd ios
fastlane ios release
```

---

### **Android Production Build**

#### **Step 1: Generate Signing Key**

```bash
cd android/app

# Generate keystore
keytool -genkeypair -v -storetype PKCS12 \
  -keystore appforge.keystore \
  -alias appforge \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Save keystore password securely
```

#### **Step 2: Configure Gradle**

```gradle
// android/app/build.gradle

android {
    signingConfigs {
        release {
            storeFile file('appforge.keystore')
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias 'appforge'
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### **Step 3: Build AAB**

```bash
# Set environment variables
export KEYSTORE_PASSWORD=your_keystore_password
export KEY_PASSWORD=your_key_password

# Generate Android App Bundle
cd android
./gradlew bundleRelease

# Output location:
# android/app/build/outputs/bundle/release/app-release.aab
```

#### **Step 4: Build APK (Optional)**

```bash
# Generate APK
./gradlew assembleRelease

# Output location:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 🚀 Deployment

### **App Store (iOS)**

#### **1. App Store Connect Setup**

```bash
1. Go to appstoreconnect.apple.com
2. Create new app
   - Name: AppForge
   - Bundle ID: com.appforge.mobile
   - SKU: appforge-mobile
3. Fill in app information
   - Category: Developer Tools
   - Content Rights: No
4. Upload screenshots (6.5" and 5.5")
5. Write description and keywords
6. Add privacy policy URL
```

#### **2. Upload Build**

```bash
# Using Xcode
1. Archive app (Product → Archive)
2. Open Organizer
3. Select archive → Distribute App
4. Choose App Store Connect
5. Upload

# Or using Transporter app
1. Export IPA from Xcode
2. Open Transporter
3. Drag and drop IPA
4. Deliver
```

#### **3. Submit for Review**

```bash
1. Select build in App Store Connect
2. Fill in version information
3. Add "What's New in This Version"
4. Submit for review
5. Wait 1-3 days for approval
```

---

### **Google Play (Android)**

#### **1. Play Console Setup**

```bash
1. Go to play.google.com/console
2. Create application
   - Name: AppForge
   - Default language: English
3. Complete store listing
   - App category: Tools
   - Description (short & long)
   - Screenshots (phone + tablet)
   - Feature graphic (1024x500)
4. Content rating questionnaire
5. Add privacy policy URL
```

#### **2. Upload Bundle**

```bash
1. Go to Release → Production
2. Create new release
3. Upload AAB file
4. Add release notes
5. Review and rollout
```

#### **3. App Signing**

```bash
# Play App Signing (recommended)
1. Play Console → Release → Setup → App Signing
2. Enroll in Play App Signing
3. Upload upload key certificate

# Or manage your own keys
# Keep your keystore file secure and backed up!
```

---

### **CI/CD with GitHub Actions**

```yaml
# .github/workflows/deploy.yml

name: Build and Deploy

on:
  push:
    branches: [main]
    tags:
      - 'v*'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Android
        env:
          KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
        run: |
          cd android
          ./gradlew bundleRelease
      
      - name: Upload to Play Store
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT }}
          packageName: com.appforge.mobile
          releaseFiles: android/app/build/outputs/bundle/release/app-release.aab
          track: production

  build-ios:
    needs: test
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - name: Install dependencies
        run: |
          npm ci
          cd ios && pod install
      
      - name: Build iOS
        run: |
          xcodebuild -workspace ios/AppForge.xcworkspace \
            -scheme AppForge \
            -configuration Release \
            -archivePath build/AppForge.xcarchive \
            archive
      
      - name: Export IPA
        run: |
          xcodebuild -exportArchive \
            -archivePath build/AppForge.xcarchive \
            -exportPath build \
            -exportOptionsPlist ios/ExportOptions.plist
      
      - name: Upload to App Store
        uses: apple-actions/upload-testflight-build@v1
        with:
          app-path: build/AppForge.ipa
          issuer-id: ${{ secrets.APPSTORE_ISSUER_ID }}
          api-key-id: ${{ secrets.APPSTORE_API_KEY_ID }}
          api-private-key: ${{ secrets.APPSTORE_API_PRIVATE_KEY }}
```

---

## 🔧 Troubleshooting

### **Common Issues**

#### **Issue: Metro Bundler Not Starting**

```bash
# Solution 1: Kill existing Metro processes
killall -9 node

# Solution 2: Clear Metro cache
npm start -- --reset-cache

# Solution 3: Clear watchman
watchman watch-del-all
```

#### **Issue: iOS Build Fails**

```bash
# Solution 1: Clean build
cd ios
rm -rf build
rm -rf Pods
rm Podfile.lock
pod install
cd ..

# Solution 2: Clear derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Solution 3: Reset CocoaPods cache
pod cache clean --all
pod deintegrate
pod install
```

#### **Issue: Android Build Fails**

```bash
# Solution 1: Clean gradle
cd android
./gradlew clean
./gradlew cleanBuildCache
cd ..

# Solution 2: Invalidate Android Studio cache
# In Android Studio: File → Invalidate Caches / Restart

# Solution 3: Delete gradle cache
rm -rf ~/.gradle/caches/
```

#### **Issue: TypeScript Errors**

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

#### **Issue: Package Not Found**

```bash
# Reinstall dependencies
rm -rf node_modules
rm package-lock.json  # or yarn.lock
npm install

# iOS specific
cd ios && pod install && cd ..
```

### **Performance Issues**

```bash
# Enable Hermes engine (if not already)
# Edit android/app/build.gradle
project.ext.react = [
    enableHermes: true
]

# For iOS, edit ios/Podfile
# Add or uncomment:
:hermes_enabled => true
```

### **Debug Menu**

```bash
# iOS Simulator: Cmd + D
# Android Emulator: Cmd/Ctrl + M
# Physical Device: Shake device

Options:
- Reload
- Debug JS Remotely (deprecated, use Flipper)
- Enable Fast Refresh
- Show Perf Monitor
- Show Inspector
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### **Development Process**

1. **Fork the repository**
   ```bash
   gh repo fork Code-Game-Ninja/appforge-mobile
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow code style guidelines
   - Add tests for new features
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   
   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Formatting
   - `refactor:` Code refactoring
   - `test:` Tests
   - `chore:` Maintenance

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create Pull Request**
   - Describe your changes
   - Link related issues
   - Add screenshots for UI changes

### **Code Review Process**

- All PRs require at least 1 approval
- CI/CD must pass (tests, lint, type-check)
- Keep PRs focused and small
- Respond to feedback promptly

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 AppForge

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Support & Community

- **Documentation**: [docs.appforge.dev](https://docs.appforge.dev)
- **Issues**: [GitHub Issues](https://github.com/Code-Game-Ninja/appforge-mobile/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Code-Game-Ninja/appforge-mobile/discussions)
- **Discord**: [Join our server](https://discord.gg/appforge)
- **Twitter**: [@appforge_dev](https://twitter.com/appforge_dev)

---

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) - The framework
- [GitHub API](https://docs.github.com/en/rest) - Data source
- [React Navigation](https://reactnavigation.org/) - Navigation
- [NativeWind](https://www.nativewind.dev/) - Styling
- [TanStack Query](https://tanstack.com/query) - Data fetching

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by the AppForge Team

[Report Bug](https://github.com/Code-Game-Ninja/appforge-mobile/issues) · [Request Feature](https://github.com/Code-Game-Ninja/appforge-mobile/issues) · [Documentation](https://docs.appforge.dev)

</div>
