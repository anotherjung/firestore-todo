create todo list using react native for ios and android using expo and firebase firestore

npx create-expo-app fire1 -t expo-template-blank-typescript 

npx expo install firebase

touch firebase.config.js

npx expo customize metro.config.js
- add code 

```javascript
config.resolver.sourceExts.push('cjs');
```

touch .env
- add your firebase config

```bash
EXPO_PUBLIC_APIKEY=""
EXPO_PUBLIC_AUTHDOMAIN=""
EXPO_PUBLIC_PROJECTID=""
EXPO_PUBLIC_STORAGEBUCKET=""
EXPO_PUBLIC_MESSAGINGSENDERID=""
EXPO_PUBLIC_APPID=""
EXPO_PUBLIC_MEASUREMENTID=""

```

App.tsx
- add code

yarn start
- open menu 
- use qrcode for test devices

yarn ios
- opens ios emulator 

yarn android
- build emulator
- start emulator device before running command

rm -f .git/index.lock