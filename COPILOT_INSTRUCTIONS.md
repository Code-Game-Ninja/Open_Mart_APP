# GitHub Copilot Instructions for AppForge Mobile

---

## [CRITICAL] - READ FIRST

### No Emojis - Use React Native Icons
- **NEVER** use emojis in **code logic**, **component JSX**, or **static UI elements**
- **ALWAYS** use icons from `react-native-vector-icons` (Ionicons, MaterialIcons, Feather) instead
- **EXCEPTION:** User-generated content (UGC) CAN contain emojis:
  - Mock data simulating GitHub repo descriptions
  - App descriptions from API responses
  - User comments or reviews
- This applies to:
  - React Native components and JSX (use icons, not emojis)
  - Static data files (use icons, not emojis)
  - Mock API responses (emojis are OK if simulating real data)
- **Examples:**
  - Instead of `⭐` for stars, use `<Icon name="star" />` from react-native-vector-icons
  - Instead of `📱` for platform, use `<Icon name="smartphone" />`
  - But a mock repo description like `description: '🚀 Fast and lightweight!'` is fine
- Design documents in `docs/` folder may use emojis for visual clarity

### Token Limit Awareness
- **DO NOT** attempt to complete entire features, large files, or complex tasks in a single response
- AI models have token generation limits (typically 4,000-8,000 tokens per response)
- When approaching the limit, **STOP and ask for the next prompt** instead of cutting off work
- **Break down large tasks** into smaller, manageable chunks:
  - Create one file at a time
  - Implement one component or feature per prompt
  - Split large refactoring into multiple steps
  - Build incrementally rather than monolithically

### Best Practices for Large Tasks
1. **Plan First:** Ask user for confirmation before starting
2. **Chunk Work:** Break into logical, independent steps
3. **Communicate Progress:** Report what's done and what's pending
4. **Ask for Next Steps:** After completing a chunk, ask "What should I work on next?"
5. **Avoid Truncation:** Never cut off or use "..." to indicate omitted code

### Incremental File Creation (MANDATORY for Large Files)
- **NEVER** try to create an entire file in one response
- **ALWAYS** follow this step-by-step approach:
  1. **Step 1 - Imports & Setup:** Create file with all imports, types/interfaces, and constants
  2. **Step 2 - Core Components:** Add main component structure and state
  3. **Step 3 - Sub-components:** Add helper components one by one
  4. **Step 4 - Logic & Handlers:** Add event handlers, API calls, effects
  5. **Step 5 - Review & Fix:** Review for errors, run dev server, fix any issues
- **After each step:** check your token limit and ask for user prompt to continue to next step if needed
- **Example workflow:**
  ```
  User: "Create EventDetailPage"
  AI: Creates file with imports, types, mock data → "Step 1 done. Say 'next' for Step 2"
  User: "next"
  AI: Adds main component structure → "Step 2 done. Say 'next' for Step 3"
  ... and so on
  ```

### Request Efficiency (Limited Requests)
- **IMPORTANT:** User has limited copilot requests (~100 per month)
- **IF user provides 2-3 tasks in ONE prompt AND you have token capacity remaining:**
  - **DO NOT STOP** - Continue working through all tasks in the same response
  - Complete all tasks if they fit within token limits
  - Only ask for next prompt if you approach token limit
- **Use requests efficiently:** Complete multiple small tasks per request to maximize value

### Update Design Documents
- **IMPORTANT:** After implementing new features or significant changes:
  - Update relevant design documents in the `docs/` folder
  - Ensure documents reflect the current implementation
  - Document any deviations from original designs with explanations
  - This helps maintain project clarity and future reference

### Auto-Run Server & Fix Errors
- **IMPORTANT:** After making code changes, ALWAYS:
  1. Kill existing dev server process (if any)
  2. Run `npm run dev` to start the development server
  3. Check for any compile/build errors in terminal output
  4. Fix any errors found before reporting completion
  5. Verify the app loads successfully (200 status)
- This is a standard step - no need for user to request it each time

### Project Structure Reference
- **IMPORTANT:** Always refer to the `docs/` folder for project architecture and page structures
- Key design documents:
  - `docs/CONCEPT.md` - Platform overview, business model, features
  - `docs/ARCHITECTURE.md` - Technical architecture and stack
  - `docs/PAGES.md` - Page structure reference
  - `docs/API_SPEC.md` - API endpoints and contracts
- **Follow these designs** when creating components, pages, and features
- Maintain consistency with the documented UI/UX patterns

---

## Project Overview
AppForge Mobile is a **React Native mobile application** for discovering, browsing, and managing open-source applications from GitHub. It brings the power of GitHub's vast repository ecosystem to mobile devices with a native, touch-optimized experience.

---

## Technology Stack (React Native)

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.73+ | Cross-platform mobile framework |
| **React** | 18.2+ | UI Library |
| **TypeScript** | 5.4+ | Type safety, strict mode enabled |
| **React Navigation** | 6.x | Native navigation (Stack, Tabs, Drawer) |

### UI & Styling
| Technology | Purpose |
|------------|---------|
| **NativeWind** | Tailwind CSS for React Native |
| **React Native Reanimated** | 60 FPS animations |
| **React Native Gesture Handler** | Touch gestures |
| **react-native-vector-icons** | Icon library (Ionicons, Material, Feather) |
| **react-native-fast-image** | Optimized image loading & caching |

### State Management
| Technology | Purpose |
|------------|---------|
| **Zustand** | Client state (lightweight, TypeScript-first) |
| **TanStack Query v5** | Server state (caching, background sync) |
| **AsyncStorage** | Local persistence |

### Data & API
| Technology | Purpose |
|------------|---------|
| **Axios** | HTTP client for GitHub API |
| **React Query** | Data fetching, caching, pagination |
| **react-native-markdown-display** | Render README files |
| **react-syntax-highlighter** | Code syntax highlighting |

### Native Features
| Technology | Purpose |
|------------|---------|
| **@react-native-async-storage/async-storage** | Local storage |
| **react-native-webview** | In-app browser |
| **react-native-share** | Native share functionality |
| **@react-native-community/linking** | Deep linking |
| **react-native-fs** | File system access |
| **@notifee/react-native** | Push notifications |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint + Prettier** | Code linting and formatting |
| **Jest** | Unit testing |
| **React Native Testing Library** | Component testing |
| **Detox** | E2E testing |
| **Reactotron** | Debugging |
| **Flipper** | React Native debugger |

---

## Code Style & Conventions

### JavaScript/TypeScript
- **Formatter:** Prettier with semicolons enabled
- **Linter:** ESLint with React Native config
- **Indentation:** 2 spaces (never tabs)
- **Line Length:** Max 100 characters
- **Variables:** Use `const` by default, `let` when reassignment needed, avoid `var`
- **Naming:**
  - `camelCase` for variables, functions, and properties
  - `PascalCase` for component names and TypeScript types
  - `UPPER_SNAKE_CASE` for constants
  - Prefix boolean variables with `is`, `has`, `should`, `can`

### React Native Components
- **Functional Components:** Always use functional components with hooks
- **File Naming:** PascalCase for components (e.g., `AppCard.tsx`)
- **Props Interface:** Define clear TypeScript interfaces for all props
- **Hooks:** Place at top of component, group related hooks together
- **Platform-Specific Code:** Use `Platform.OS` or `.ios.tsx`/`.android.tsx` when needed

### Styling
- **NativeWind (Tailwind):** Use for most styling
- **StyleSheet.create():** Use for performance-critical or complex styles
- **Responsive Design:** Mobile-first, test on multiple screen sizes
- **Dark Mode:** Support both light and dark themes

---

## Project Structure

```
appforge-mobile/
├── docs/                     # Documentation
│   ├── CONCEPT.md           # Project concept and vision
│   ├── ARCHITECTURE.md      # Technical architecture
│   ├── PAGES.md             # Screen specifications
│   ├── SECURITY.md          # Security guidelines
│   └── GETTING_STARTED.md   # Setup instructions
├── src/
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── types.ts
│   ├── screens/             # Screen components
│   │   ├── Home/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── components/
│   │   ├── Apps/
│   │   │   ├── AppsListScreen.tsx
│   │   │   ├── AppDetailScreen.tsx
│   │   │   └── components/
│   │   ├── Search/
│   │   ├── Categories/
│   │   ├── Favorites/
│   │   └── Settings/
│   ├── components/          # Reusable components
│   │   ├── common/          # Button, Card, Input, Loading
│   │   ├── apps/            # AppCard, AppListItem, AppStats
│   │   └── layout/          # Header, SearchBar, TabBar
│   ├── services/            # API & external services
│   │   ├── api/             # GitHub API client
│   │   │   ├── github.ts
│   │   │   ├── client.ts
│   │   │   └── endpoints.ts
│   │   ├── storage/         # AsyncStorage helpers
│   │   └── notifications/   # Push notifications
│   ├── hooks/               # Custom React hooks
│   │   ├── useApps.ts
│   │   ├── useAppDetails.ts
│   │   ├── useFavorites.ts
│   │   └── useSearch.ts
│   ├── store/               # State management (Zustand)
│   │   ├── favoritesStore.ts
│   │   ├── settingsStore.ts
│   │   └── searchStore.ts
│   ├── types/               # TypeScript types
│   │   ├── app.ts
│   │   ├── github.ts
│   │   └── navigation.ts
│   ├── utils/               # Utility functions
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── theme/               # Theme configuration
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   └── assets/              # Images, fonts, animations
│       ├── images/
│       ├── fonts/
│       └── animations/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── __tests__/              # Test files
├── .env                    # Environment variables
├── app.json
├── babel.config.js
├── metro.config.js
├── tsconfig.json
└── package.json
```

---

## API Integration

### GitHub API
- **Base URL:** `https://api.github.com`
- **Authentication:** Optional GitHub token for higher rate limits
- **Rate Limiting:** 60 requests/hour (unauthenticated), 5000 (authenticated)

### Key Endpoints
```typescript
// Search repositories
GET /search/repositories?q=topic:developer-tools&sort=stars&per_page=30

// Get repository details
GET /repos/:owner/:repo

// Get README
GET /repos/:owner/:repo/readme

// Get releases
GET /repos/:owner/:repo/releases

// Get contributors
GET /repos/:owner/:repo/contributors

// Get languages
GET /repos/:owner/:repo/languages

// Get topics
GET /repos/:owner/:repo/topics
```

### Response Format
All API responses are handled through React Query with standard error handling:

```typescript
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}
```

---

## Naming Conventions

### Navigation & Screens
- **Screen Components:** `HomeScreen.tsx`, `AppDetailScreen.tsx`
- **Navigation Stacks:** `AppNavigator.tsx`, `TabNavigator.tsx`

### Components & Files
- Components: PascalCase (`AppCard.tsx`, `SearchBar.tsx`)
- Hooks: camelCase with 'use' prefix (`useApps.ts`, `useFavorites.ts`)
- Utils: camelCase (`formatDate.ts`, `parseReadme.ts`)
- Types: PascalCase (`AppType.ts`, `NavigationType.ts`)
- Tests: Same name with `.test.tsx` (`AppCard.test.tsx`)

### Routes & Navigation
```typescript
// Navigation stack
Root Navigator
├── Tab Navigator (Bottom tabs)
│   ├── Home
│   ├── Apps
│   ├── Categories
│   ├── Favorites
│   └── Settings
└── Stack Navigator (Screens)
    ├── AppDetail
    ├── AppReadme
    ├── Search
    └── CategoryDetail
```

---

## Security Best Practices

### API Security
- Never commit GitHub tokens to git
- Use environment variables (.env)
- Implement certificate pinning in production
- Validate all external URLs before opening

### Data Security
- Use encrypted storage for sensitive data
- Implement proper error handling for API failures
- Sanitize user inputs (search queries)
- Handle rate limiting gracefully

### App Permissions
- Request minimal permissions
- Explain why permissions are needed
- Gracefully handle permission denials

---

## Performance Requirements

### Target Metrics
- **App Launch Time:** < 2 seconds (cold start)
- **Screen Transition:** < 300ms
- **List Scrolling:** 60 FPS
- **API Response Time:** < 1 second
- **Memory Usage:** < 150MB (average)

### Optimization Strategies
- Use `FlatList` with optimization props (`initialNumToRender`, `maxToRenderPerBatch`)
- Implement `react-native-fast-image` for image caching
- Memoize expensive components with `React.memo`
- Use `useCallback` and `useMemo` appropriately
- Implement pagination for long lists
- Cache API responses with React Query

---

## Testing Guidelines
- **Unit Tests:** For utilities and helper functions (Jest)
- **Component Tests:** For UI components (React Native Testing Library)
- **Integration Tests:** For API integration and data flow
- **E2E Tests:** For critical user journeys (Detox)
- **Coverage:** Aim for 80%+ code coverage

---

## Commit Message Convention

Follow Conventional Commits format:
```
type(scope): brief description

Longer explanation if needed.

Fixes #issue-number
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example:** `feat(search): add real-time search with debounce`

---

## Documentation Standards

### Code Comments
- Use JSDoc for all public functions and exported components
- Explain "why", not "what" (code should be self-explanatory)
- Document complex algorithms and business logic

### README Requirements
- Project description
- Tech stack
- Installation instructions (iOS & Android)
- Environment variables
- Running the project
- Building for production
- Contributing guidelines

---

## Performance Checklist
- ✅ Use FlatList with optimization props
- ✅ Implement image caching (react-native-fast-image)
- ✅ Cache API responses with React Query
- ✅ Memoize expensive computations
- ✅ Optimize list rendering
- ✅ Monitor bundle size
- ✅ Implement proper loading states
- ✅ Use native animations (Reanimated)

---

## Accessibility Checklist
- ✅ Add accessibility labels to interactive elements
- ✅ Support screen readers (Voice Over, TalkBack)
- ✅ Ensure proper touch target sizes (min 44x44)
- ✅ Test with accessibility tools
- ✅ Maintain proper color contrast
- ✅ Support dynamic font sizes

---

## Development Workflow

1. **Branch Strategy:** `main` (production), `develop` (staging), `feature/*` (features)
2. **Before Committing:**
   - Run linter (`npm run lint`)
   - Run type checking (`npx tsc --noEmit`)
   - Run tests (`npm test`)
   - Update documentation if needed
3. **Pull Request:**
   - Clear title and description
   - Link related issues
   - Request review from team
4. **Code Review:**
   - Check for code quality
   - Verify tests pass
   - Test on both iOS and Android
   - Ensure documentation is updated

---

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs)
- [React Navigation](https://reactnavigation.org/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [NativeWind](https://www.nativewind.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

## Support

For questions or issues, please:
1. Check existing documentation in `docs/` folder
2. Search GitHub Issues
3. Create a new issue with detailed description

---

**Last Updated:** January 2026  
**Version:** 1.0.0
