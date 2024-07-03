# Apple Sign-In with React Native

This project demonstrates how to implement Apple Sign-In in a React Native application using `@invertase/react-native-apple-authentication` and Firebase authentication with `@react-native-firebase/auth`.

## Features

- Apple Sign-In integration with Firebase authentication.
- Persistent storage of user information (name and email) using AsyncStorage.
- Automatic retrieval of user information on subsequent sign-ins.
- Simple user interface to demonstrate sign-in and sign-out functionality.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- You have installed [React Native CLI](https://reactnative.dev/docs/environment-setup).
- You have a Firebase project set up. Follow the [Firebase setup instructions](https://firebase.google.com/docs/android/setup) to add Firebase to your Android project.
- You have an Apple Developer account and have configured Apple Sign-In. Follow the [Apple Sign-In setup instructions](https://invertase.io/oss/react-native-apple-authentication/quick-start/ios) for iOS.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/apple-signin-react-native.git
    cd apple-signin-react-native
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Link the native dependencies:

    ```bash
    npx pod-install
    ```

4. Configure Firebase:

- Follow the instructions to [set up Firebase for your project](https://firebase.google.com/docs/android/setup).
- Download the `google-services.json` file for Android and place it in the `android/app` directory.
- Download the `GoogleService-Info.plist` file for iOS and place it in the `ios` directory.

## Running the App

### iOS

```bash
npx react-native run-ios
```


# Code Overview

## App.js

	•	Handles the main logic of the application.
	•	Manages user state and AsyncStorage.
	•	Contains the sign-in and sign-out functionality.

## AppleSignIn.js

	•	Handles the Apple Sign-In button and authentication process.
	•	Requests Apple Sign-In with full name and email scopes.
	•	Signs in with Firebase using the obtained Apple credential.
