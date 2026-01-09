# 🚀 Quick Start: Deploy to Play Store

## Prerequisites Checklist
- [ ] Google Play Console account ($25)
- [ ] Expo account (free - create at expo.dev)
- [ ] Node.js installed
- [ ] Git installed

## 5-Minute Setup

### 1. Install EAS CLI (2 min)
```bash
npm install -g eas-cli
```

### 2. Login to Expo (1 min)
```bash
cd appmart
eas login
```
*Enter your Expo credentials or create account*

### 3. Configure Build (1 min)
```bash
eas build:configure
```
*Press Enter to accept defaults*

### 4. Start Production Build (1 min)
```bash
eas build --platform android --profile production
```
*This takes 10-15 minutes. You can close terminal - you'll get email when done.*

### 5. While Building... (15 min)
Setup Google Play Console:
1. Go to https://play.google.com/console
2. Create developer account ($25)
3. Create new app
4. Fill in store listing (use content from PLAY_STORE_DEPLOYMENT.md)
5. **Important**: Add privacy policy URL - use GitHub Pages:
   - Go to repo Settings → Pages
   - Enable Pages
   - Use: `https://code-game-ninja.github.io/Open_Mart_APP/PRIVACY_POLICY`

### 6. Download & Upload (5 min)
1. Once build completes, download `.aab` file from email link
2. Go to Play Console → Production → Create Release
3. Upload the `.aab` file
4. Add release notes (see PLAY_STORE_DEPLOYMENT.md)
5. Click "Review" → "Start rollout to Production"

### 7. Wait for Review (2-7 days)
Google will review your app and publish it!

## That's It! 🎉

Your app will be live on Play Store after Google's review.

## Need Help?

See [PLAY_STORE_DEPLOYMENT.md](./PLAY_STORE_DEPLOYMENT.md) for detailed instructions.

## Cost Breakdown
- **Google Play Console**: $25 (one-time, lifetime)
- **Expo EAS**: FREE (30 builds/month)
- **Total**: $25

## Alternative: Test Locally First

Before deploying, test with APK:
```bash
eas build --platform android --profile preview
```
This creates an APK you can install on your phone to test.
