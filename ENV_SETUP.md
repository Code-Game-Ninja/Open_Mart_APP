# 🔐 Environment Setup Guide

## Setting Up GitHub Token

Your GitHub Personal Access Token (PAT) is now stored securely in environment variables and **will not be committed to GitHub**.

### Quick Setup

1. **Copy the example file:**
   ```bash
   cd appmart
   cp .env.example .env
   ```

2. **Get your GitHub token:**
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes:
     - ✅ `public_repo` (for public repositories)
     - ✅ `repo` (if you want to access private repos)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

3. **Add token to .env file:**
   ```env
   EXPO_PUBLIC_GITHUB_TOKEN=ghp_your_actual_token_here
   ```

4. **Restart the development server:**
   ```bash
   npx expo start --clear
   ```

## ✅ Security Checklist

- ✅ `.env` file is in `.gitignore` (never committed)
- ✅ `.env.example` has placeholder (safe to commit)
- ✅ Token is read from environment variable
- ✅ Warning shown if token is missing
- ✅ Token works with Expo's environment variable system

## 🚨 Important Notes

### Never Do This:
- ❌ Don't commit `.env` file
- ❌ Don't hardcode tokens in code
- ❌ Don't share your token publicly
- ❌ Don't push tokens to GitHub

### If Token Gets Exposed:
1. Go to https://github.com/settings/tokens
2. Find the exposed token
3. Click "Delete" immediately
4. Generate a new token
5. Update your `.env` file

## 📱 For Team Members

When cloning this project:

1. Clone the repository
2. Run `cd appmart && cp .env.example .env`
3. Get your own GitHub token from https://github.com/settings/tokens
4. Add it to `.env` file
5. Run `npm install` and `npx expo start`

## 🔍 How It Works

The app reads the token in this order:

1. **Expo Constants** - From `app.json` extra config
2. **Environment Variable** - From `EXPO_PUBLIC_GITHUB_TOKEN`
3. **Fallback** - Empty string with warning

```typescript
const GITHUB_TOKEN = 
  Constants.expoConfig?.extra?.githubToken || 
  process.env.EXPO_PUBLIC_GITHUB_TOKEN || 
  '';
```

## 🌐 Deployment

### For EAS Build:
Add secrets to your Expo account:

```bash
eas secret:create --scope project --name EXPO_PUBLIC_GITHUB_TOKEN --value your_token_here
```

### For GitHub Actions:
Add to repository secrets:
- Go to Settings → Secrets → Actions
- Add `EXPO_PUBLIC_GITHUB_TOKEN`

## 📚 Additional Resources

- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Securing API Keys in React Native](https://reactnative.dev/docs/security)

---

**Remember: Keep your tokens secret, keep your app secure! 🔒**
