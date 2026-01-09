# Contributing to AppMart

Thank you for considering contributing to AppMart! 🎉

## How to Contribute

### 🐛 Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/Code-Game-Ninja/Open_Mart_APP/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Device/OS information

### ✨ Suggesting Features

1. Check [FEATURE_SUGGESTIONS.md](./FEATURE_SUGGESTIONS.md) for existing ideas
2. Create an issue with:
   - Clear feature description
   - Use case and benefits
   - Possible implementation approach

### 🔧 Pull Requests

1. **Fork the repository**
2. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**:
   - Follow existing code style
   - Add comments where needed
   - Update documentation if needed
4. **Test your changes**:
   ```bash
   cd appmart
   npx expo start
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "Add: Amazing feature description"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** with:
   - Clear description of changes
   - Link to related issue (if any)
   - Screenshots/videos of UI changes

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Open_Mart_APP.git
   cd Open_Mart_APP/appmart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment:
   ```bash
   cp .env.example .env
   # Add your GitHub token to .env
   ```

4. Start development server:
   ```bash
   npx expo start
   ```

## Code Style

- **TypeScript**: Use proper types, avoid `any`
- **Components**: Use functional components with hooks
- **Naming**: 
  - Components: PascalCase (e.g., `RepoCard.tsx`)
  - Functions: camelCase (e.g., `fetchRepositories`)
  - Constants: UPPER_SNAKE_CASE (e.g., `BASE_URL`)
- **Formatting**: Use 2 spaces for indentation
- **Imports**: Group by: React, third-party, local

## Project Structure

```
appmart/
├── app/                    # Screens (Expo Router)
├── components/            # Reusable components
├── services/              # API services
├── store/                 # State management
├── hooks/                 # Custom hooks
└── constants/            # App constants
```

## Testing

Before submitting PR:
- [ ] App builds without errors
- [ ] No TypeScript errors
- [ ] Tested on both light and dark mode
- [ ] Tested on Android (or iOS if available)
- [ ] All existing features still work

## Commit Message Guidelines

Use clear, descriptive commit messages:

- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Changes to existing feature
- `Refactor:` Code restructuring
- `Docs:` Documentation changes
- `Style:` UI/styling changes

Examples:
```
Add: Recently viewed repositories feature
Fix: Dark mode colors in search screen
Update: Increase API request limits
Docs: Add deployment instructions
```

## Areas We Need Help With

### High Priority
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] i18n (internationalization)

### Features (See FEATURE_SUGGESTIONS.md)
- [ ] Recently viewed repositories
- [ ] Advanced filtering
- [ ] Collections/folders
- [ ] Code preview
- [ ] Repository comparison

### Documentation
- [ ] More examples
- [ ] Video tutorials
- [ ] API documentation

## Community

- **Questions?** Open a [Discussion](https://github.com/Code-Game-Ninja/Open_Mart_APP/discussions)
- **Chat**: Coming soon!
- **Twitter**: Coming soon!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards
- ✅ Be respectful and inclusive
- ✅ Welcome newcomers
- ✅ Accept constructive criticism
- ✅ Focus on what's best for the community

- ❌ No harassment or discrimination
- ❌ No trolling or insulting comments
- ❌ No political or off-topic discussions

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in documentation

## Questions?

Feel free to reach out:
- Email: your.email@example.com
- GitHub Issues: [Open an issue](https://github.com/Code-Game-Ninja/Open_Mart_APP/issues)

---

Thank you for contributing to AppMart! 🚀
