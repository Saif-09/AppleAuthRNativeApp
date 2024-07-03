import React from 'react';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AppleSignIn({ onSignIn }) {
    async function onAppleButtonPress() {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        if (!appleAuthRequestResponse.identityToken) {
            throw new Error('Apple Sign-In failed - no identity token returned');
        }

        const { identityToken, nonce, fullName, email } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        const userCredential = await auth().signInWithCredential(appleCredential);
        const user = userCredential.user;
        console.log(user, "UserAppleSignIn");

        let userInfo = {
            email: email || user.email,
        };

        if (fullName) {
            userInfo.fullName = `${fullName.givenName} ${fullName.familyName}`;
            await AsyncStorage.setItem('fullName', userInfo.fullName);
        } else {
            const savedFullName = await AsyncStorage.getItem('fullName');
            userInfo.fullName = savedFullName || 'N/A';
        }

        onSignIn(userInfo);
    }

    return (
        <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
                width: 160,
                height: 45,
            }}
            onPress={onAppleButtonPress}
        />
    );
}

export default AppleSignIn;