import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, Stack } from 'expo-router';
import { fetchAuthUser, initAuthDB } from '@/DB/authDB';

// Define the User type
interface User {
  name: string;
  email: string;
  password: string;
}

const AuthLayout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // To track error messages

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await initAuthDB(); 
        const loggedInUser = await fetchAuthUser(); 
        setUser(loggedInUser); // Update the state with the user or null
      } catch (error) {
        console.error('Error initializing auth:', error);
        setError('Failed to load authentication data.');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    ); // Show loading spinner
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    ); // Show error message if authentication fails
  }

  if (user) {
    return <Redirect href="/home" />; // Redirect to home if user is logged in
  }

  return (
    <Stack screenOptions={{ animation: 'none' }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});

export default AuthLayout;
