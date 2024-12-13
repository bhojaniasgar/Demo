# React Native
A modern mobile application built with React Native.


## Prerequisites
- Node.js (v18 or higher)
- npm or Yarn
- React Native CLI
- Xcode (for iOS, Mac only)
- Android Studio & Android SDK
- JDK 11 or newer
- CocoaPods (for iOS)

## Getting Started

### Installation
```bash
# Clone the repository
git clone https://github.com/bhojaniasgar/demo.git
cd demo

# Install dependencies
npm install
# OR
yarn install

# iOS only: Install pods
cd ios && pod install && cd ..
```

### Development Environment Setup

#### iOS (Mac only)
1. Install Xcode from the Mac App Store
2. Install iOS Simulator
3. Install CocoaPods: `brew install cocoapods`

#### Android
1. Install Android Studio
2. Install Android SDK
3. Configure ANDROID_HOME environment variable
4. Create/Start Android Virtual Device (AVD)

### Running the App

#### Start Metro Server
```bash
npm start
# OR
yarn start
```

#### Run on iOS (Mac only)
```bash
npm run ios
# OR
yarn ios
```

#### Run on Android
```bash
npm run android
# OR
yarn android
```

### Development Workflow
1. Start the Metro bundler
2. Run the app on your preferred platform
3. For live reload:
   - Android: Press R twice
   - iOS: Cmd + R
4. Access dev menu:
   - Android: Ctrl/Cmd + M
   - iOS: Cmd + D


## Building for Production

### Android
```bash
cd android
./gradlew assembleRelease
```
APK location: `android/app/build/outputs/apk/release/app-release.apk`

### iOS
Use Xcode to archive and distribute your application:
1. Select "Any iOS Device" as the build target
2. Product → Archive
3. Follow distribution steps in Xcode

## Troubleshooting

### Common Issues
1. Metro Bundler Issues
   ```bash
   npm start -- --reset-cache
   ```

2. Android Build Failures
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

3. iOS Build Issues
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   ```

## Learn More
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [React Native Community](https://github.com/react-native-community)

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
- Developer: Bhojani Asgar
- Email: im.bhojaniasgar@gmail.com
- GitHub: [bhojaniasgar](https://github.com/bhojaniasgar)
