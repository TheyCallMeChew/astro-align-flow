# AstroFlow - iOS Reflection & Meditation App

A private, voice-driven reflection and meditation tool built with React, TypeScript, Tailwind CSS, and Capacitor for iOS.

## ✨ Features

- 🎙️ **Voice Reflections**: Record spoken reflections with AI transcription and compassionate insights
- 🧘 **Adjustable Meditation Timer**: 1-60 minute customizable meditation sessions
- 🌙 **Moon Phase Integration**: Content personalized by lunar cycles
- ✨ **AI-Powered Insights**: DeepSeek AI generates summaries and affirmations
- 🔒 **Privacy-First**: All data stored locally on device
- 📱 **iOS Native**: Built with Capacitor for native iOS experience
- 🎯 **Morning Alignment**: Set daily intentions and check energy levels
- 🌅 **Evening Reflection**: Review tasks, gratitude, and synchronicities
- 📊 **Insights Dashboard**: Track streaks, badges, and patterns
- 🎨 **Onboarding**: Personalized setup with birth data or energy quiz

## 🛠 Tech Stack

- **Platform**: iOS (Capacitor)
- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **UI**: shadcn/ui components
- **State**: Zustand with persistence
- **Storage**: Capacitor Preferences
- **Audio**: capacitor-voice-recorder
- **AI**: DeepSeek API (cost-effective alternative to OpenAI)

## 📱 iOS Setup

### Prerequisites

- Mac with Xcode installed
- Apple Developer account (for device testing)
- Node.js 18+ and npm

### Development

1. **Clone and install dependencies:**
```bash
git clone <your-repo-url>
cd astro-align-flow
npm install
```

2. **Configure DeepSeek API:**
Create a `.env` file in the project root:
```env
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

Get your API key from: https://platform.deepseek.com/

3. **Add iOS platform:**
```bash
npx cap add ios
```

4. **Build and sync:**
```bash
npm run build
npx cap sync ios
```

5. **Open in Xcode:**
```bash
npx cap open ios
```

6. **Configure in Xcode:**
   - Select your team/signing certificate
   - Choose target device or simulator
   - Update `Info.plist` if needed (mic permissions auto-added)
   - Click Run (⌘R)

### iOS Permissions

**CRITICAL**: Add microphone permission to prevent crash.

After running `npx cap sync ios`, add this to `ios/App/App/Info.plist`:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>AstroFlow uses your microphone to record reflections and meditations, helping you align your thoughts and track your progress.</string>
```

The app requires:
- **Microphone Access**: Required for voice reflections
- **Notifications**: Optional daily reminders (configured automatically)

### Live Reload (Development Only)

For development with live reload:

1. Update `capacitor.config.ts`:
```typescript
server: {
  url: 'http://YOUR_LOCAL_IP:8080',
  cleartext: true
}
```

2. Run dev server and sync:
```bash
npm run dev
npx cap sync ios && npx cap run ios
```

**⚠️ CRITICAL**: Remove `server` block before production builds!

### Production Build

For App Store or TestFlight:

1. Remove `server.url` from `capacitor.config.ts`
2. Build: `npm run build`
3. Sync: `npx cap sync ios`
4. Open Xcode and archive for distribution

## 🤖 AI Configuration

### Using DeepSeek (Recommended)

DeepSeek is cost-effective and provides excellent results:

```env
VITE_DEEPSEEK_API_KEY=sk-your-key-here
```

**Pricing**: ~$0.14 per 1M tokens (input) vs OpenAI's $2.50-$5.00

### Fallback Options

If DeepSeek is unavailable, the app gracefully degrades:
1. Uses Web Speech API for transcription (browser-based)
2. Provides generic compassionate summaries
3. All features remain functional

### Extending AI Features

To add custom AI providers, modify:
- `src/services/aiReflection.ts` - Add new API integrations
- Update constructor to accept multiple providers

## 📂 Project Structure

```
src/
├── components/
│   ├── BottomTabBar.tsx      # 5-tab navigation (Home, Morning, Reflect, Meditate, Insights)
│   └── ui/                   # shadcn components
├── services/
│   ├── voiceRecorder.ts      # Native iOS audio recording
│   ├── aiReflection.ts       # DeepSeek API integration
│   └── meditationTimer.ts    # Adjustable timer (1-60 min)
├── pages/
│   ├── onboarding/           # First-run wizard
│   ├── Home.tsx              # Main dashboard
│   ├── MorningAlignmentNew.tsx
│   ├── Reflection.tsx        # Voice recording & AI insights
│   ├── Meditation.tsx        # Meditation timer
│   ├── EveningReflectionNew.tsx
│   ├── Insights.tsx
│   └── Settings.tsx
├── store/
│   └── index.ts              # Zustand store with persistence
└── App.tsx                   # Router & auth guards
```

## 🔒 Privacy & Data

- **Local-Only Storage**: All data stored via Capacitor Preferences
- **No Cloud Sync**: Reflections never leave your device
- **Export Anytime**: JSON export available in Settings
- **Full Control**: Delete data or reset at any time

## 🧘 Meditation Features

- **Adjustable Duration**: 1-60 minutes (saved preference)
- **Visual Timer**: Circular progress indicator
- **Breathing Guides**: Low/Medium/High energy techniques
- **Pause/Resume**: Full control during session
- **Haptic Feedback**: Native iOS haptics on actions

## 🎤 Voice Reflection Workflow

1. Tap microphone → Start recording
2. Speak naturally (unlimited time)
3. Tap stop → Processing with DeepSeek AI
4. View transcript + compassionate summary
5. Receive personalized affirmation
6. Optional: Speak affirmation aloud (TTS)

## 🔧 Troubleshooting

### Microphone Permission Crash

**Error**: "This app has crashed because it attempted to access privacy-sensitive data without a usage description."

**Fix**: 
1. Open `ios/App/App/Info.plist`
2. Add the `NSMicrophoneUsageDescription` key (see iOS Permissions section above)
3. Rebuild in Xcode

### Microphone Not Working
- Check Settings → AstroFlow → Microphone is enabled
- Restart app after granting permission
- Verify `Info.plist` has `NSMicrophoneUsageDescription` key
- Test on a real device (simulator has limited mic support)

### DeepSeek API Errors
- Verify API key is correct in `.env`
- Check API quota: https://platform.deepseek.com/usage
- App will fallback to offline mode if API unavailable

### Build Errors
- Clear derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData`
- Clean iOS build: `cd ios && pod deintegrate && pod install`
- Resync: `npx cap sync ios --force`

## 📄 License

MIT

---

Built with ❤️ using [Lovable](https://lovable.dev)
