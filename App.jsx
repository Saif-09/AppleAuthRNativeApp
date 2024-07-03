import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import AppleSignIn from './src/components/AppleSignIn';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [user, setUser] = useState(null);
  console.log(user, "UserObj");

  useEffect(() => {
    // Load user info from AsyncStorage on app start
    const loadUserInfo = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };
    loadUserInfo();
  }, []);

  const handleSignIn = async (userInfo) => {
    // Save user info to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut(); // Sign out the user from Firebase
      await AsyncStorage.removeItem('user'); // Clear user info from AsyncStorage
      await AsyncStorage.removeItem('fullName'); // Clear user's full name from AsyncStorage
      setUser(null); // Clear the user state
    } catch (error) {
      console.error('Sign-out failed: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.info}>Name: {user.fullName}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Sign In with Apple</Text>
          <AppleSignIn onSignIn={handleSignIn} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default App;