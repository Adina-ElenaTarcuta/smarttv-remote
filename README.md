A minimal mobile application developed with Expo and React Native (TypeScript) app that discovers a TV or any BLE peripheral, connects over Bluetooth Low Energy, and sends remote-control commands such as volume/channel, D-pad, home/back, mute, and text input via a modal keyboard.

#**Features**

Pairing screen: scan nearby BLE devices, select to connect, live status badge.

Remote screen: DirectionalPad (↑ ↓ ← → OK), Back/Home, VOL UP and DOWN / Channel UP and DOWN/ Mute, Keyboard modal to send text.

BLE client: scan, connect, discover services/characteristics, write bytes/base64, write text (chunked).

Clean structure: src/ble, src/components, src/screens, src/ui.

Configurable UUIDs: service + characteristic can be edited in the app.

#**Pre-installations packages and environment requierments**

 - Node.js 18+ and npm

 - Android Studio (SDK + Platform Tools)

 - A real Android phone for BLE (the Android emulator does not support Bluetooth)

#**Running on the Android emulator (UI only)**

You can preview UI, but BLE scan/connect won’t work in the emulator.
commands:
 - npx expo run:android
 - npx expo start --dev-client
(press 'a' to open the emulator)

#**Scripts for running the application on phisical device**
Pre-requests:
- Android: Android Studio SDK and USB debugging enabled on the phone.
  Tip for Android: Verify ADB sees the phone with the command: adb devices ; should show: <serial>  device
- iOS: macOS + Xcode + Apple ID/Team (enable 'Developer Mode' on the device: Settings → Privacy & Security → Developer Mode).

**FOR ANDROID**
  `Install JS deps`
npm install

  `Build & install native Dev Client on device/emulator`
npx expo run:android

  `Start Metro for Dev Client (day-to-day coding)`
npx expo start --dev-client

  `Clear Metro cache if modules look stale`
npx expo start --dev-client -c

**FOR iOS**
  `Install JS deps`
npm install

  `Build & install the Dev Client on the device (first time / after native changes)`
(Plug in the iPhone; may prompt Xcode signing the first time)
npx expo run:ios --device

`Start Metro (day-to-day development)`
npx expo start --dev-client

# Clear Metro cache if needed
npx expo start --dev-client -c
