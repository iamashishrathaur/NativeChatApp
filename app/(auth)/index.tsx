import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import AuthInput from './(components)/AuthInput';
import AuthButton from './(components)/AuthButton';
import { axiosInstance } from '@/api/apiClient';
import { initAuthDB, insertAuthUser } from '@/DB/authDB';
import { useAuthStore } from '@/store/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggingIn,login} = useAuthStore()

  const handleLogin = async () => {
    const user = { email, password };
    const success = await login(user);
    if (success) {
      router.replace('/(pages)/home'); 
    }
  };
  

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome Back</Text>
        <AuthInput icon="email-outline" placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AuthInput icon="lock-outline" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry keyboardType=''/>

        <TouchableOpacity activeOpacity={0.8} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <AuthButton title="Login" onPress={handleLogin} loading={isLoggingIn} />

        <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              Don't have an account?
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>router.navigate('/(auth)/signup')}>
              <Text style={styles.toggleActionText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#6366F1',
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap:'3'
  },
  toggleText: {
    color: '#6B7280',
  },
  toggleActionText: {
    color: '#6366F1',
    fontWeight: '600',
  },
});

export default Login;
