# Macanudo Mobile

A React Native mobile application built with Expo, featuring role-based authentication and a custom Material Design 3 theme.

## 🚀 Tech Stack

- **[Expo](https://expo.dev/)** - Development platform for React Native
- **[React Native](https://reactnative.dev/)** - Mobile app framework
- **[React Native Paper](https://callstack.github.io/react-native-paper/)** - Material Design 3 components
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based routing
- **[React Navigation](https://reactnavigation.org/)** - Navigation library with Drawer Navigator
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Expo Material 3 Theme](https://www.npmjs.com/package/@pchmn/expo-material3-theme)** - Material Design 3 theming

## 📋 Features

- ✅ Role-based authentication (Admin/User)
- ✅ Drawer navigation with custom header
- ✅ Material Design 3 theming (light/dark mode support)
- ✅ Custom color palette with warm earth tones
- ✅ Haptic feedback on iOS
- ✅ Immersive mode (hidden system navigation bar)
- ✅ Role-based screen access control
- ✅ Responsive UI components

## 🎨 Color Palette

The app uses a custom warm color scheme:

**Light Mode:**
- Background: `#EADBC0` (cream)
- Text: `#4f3122` (brown)
- Accent: `#C7A26A` (wood)
- Success: `#8A9A5B` (olive green)

**Dark Mode:**
- Background: `#4f3122` (brown)
- Text: `#EADBC0` (cream)
- Accent: `#C7A26A` (wood)
- Card: `#6f4c34` (secondary brown)

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Expo CLI
- EAS CLI (for builds)

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd macanudo-mobile
   ```

2. **Install dependencies:**
   ```bash
   yarn
   ```

3. **Start the development server:**
   ```bash
   yarn start
   ```

## 🔨 Development

### Running the app

```bash
# Start Expo development server
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios

# Run on web
yarn web
```

### Building the app

#### Preview builds (internal testing)

```bash
# Android preview build
eas build --platform android --profile preview

# iOS preview build
eas build --platform ios --profile preview

# Build for all platforms
eas build --platform all --profile preview
```

#### Production builds

```bash
# Android production build
eas build --platform android

# iOS production build
eas build --platform ios

# Build for all platforms
eas build --platform all
```

## 📁 Project Structure

```
macanudo-mobile/
├── app/                          # Application screens (Expo Router)
│   ├── main/                     # Main app screens
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── App.tsx                   # Main app component with navigation
│   ├── LoginScreen.tsx           # Authentication screen
│   ├── _layout.tsx               # Root layout with theme provider
│   └── +not-found.tsx            # 404 error screen
├── components/                   # Reusable components
│   ├── ui/                       # UI-specific components
│   │   ├── collapsible.tsx
│   │   └── icon-symbol.tsx
│   ├── themed-view.tsx
│   ├── themed-text.tsx
│   ├── haptic-tab.tsx
│   ├── external-link.tsx
│   └── hello-wave.tsx
├── constants/                    # App constants
│   └── theme.ts                  # Color palette and fonts
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── scripts/                      # Utility scripts
│   └── reset-project.js
├── eslint.config.js              # ESLint configuration
├── app.json                      # Expo configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🔐 Authentication

The app implements a simple role-based authentication system:

- **Admin users**: Access to all screens including Settings
- **Regular users**: Access to Home and Profile screens only

### Default credentials (for testing)

Update the `LoginScreen.tsx` component to configure authentication.

## 🎯 Key Components

### Navigation

- **Drawer Navigator**: Side menu with logout functionality
- **Custom Header**: Shows app name, current page, and user role badge
- **Role-based routes**: Conditional screen rendering based on user role

### Theming

- **Dynamic theming**: Automatically switches between light/dark mode
- **Material Design 3**: Modern component styling
- **Custom colors**: Warm earth-tone palette

### UI Components

- `ThemedView`: Auto-themed container component
- `ThemedText`: Auto-themed text component
- `Collapsible`: Expandable content sections
- `IconSymbol`: Cross-platform icon component
- `HapticTab`: Tab with haptic feedback (iOS)

## 🛠️ Configuration

### Theme Customization

Edit `constants/theme.ts` to modify the color palette:

```typescript
export const Colors = {
  light: {
    text: '#4f3122',
    background: '#EADBC0',
    tint: '#C7A26A',
    // ...more colors
  },
  dark: {
    // ...dark mode colors
  },
};
```

### App Configuration

Edit `app.json` to configure app metadata, splash screen, icons, and build settings.

## 📱 Platform-Specific Features

### Android
- System navigation bar hidden (immersive mode)
- Overlay-swipe behavior for navigation bar access

### iOS
- Haptic feedback on tab interactions
- SF Symbols support via icon mapping

### Web
- Hydration-safe color scheme detection
- Material Icons fallback for symbols

## 🧪 Testing

```bash
# Run linter
yarn lint

# Type check
yarn tsc --noEmit
```

## 📝 Scripts

- `yarn start` - Start Expo development server
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS device/simulator
- `yarn web` - Run in web browser
- `yarn lint` - Run ESLint
- `yarn reset-project` - Reset to blank project state

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linter and type checks
4. Submit a pull request

## 📄 License

[Add your license information here]

## 👥 Authors

[Add author information here]

## 🐛 Known Issues

- System navigation bar behavior may vary on different Android devices
- Dark mode transitions may require app restart on some devices

## 📞 Support

For issues and questions, please open an issue in the repository.