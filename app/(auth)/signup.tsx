import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AuthInput from './(components)/AuthInput';
import AuthButton from './(components)/AuthButton';
import { axiosInstance } from '@/api/apiClient';
import { router } from 'expo-router';

const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    const user = { fullname, email, password };
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/signup', user);
      console.log(response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to sign up. Please try again.";
      console.error('Signup Error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create an Account</Text>
        <AuthInput icon="account-outline" placeholder="Full Name" value={fullname} onChangeText={setFullname} keyboardType=''/>
        <AuthInput icon="email-outline" placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AuthInput icon="lock-outline" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry keyboardType=''/>
        <AuthButton title="Sign Up" onPress={handleSignUp} loading={isLoading} />
        <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
            Already have an account?
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>router.push('/(auth)')}>
              <Text style={styles.toggleActionText}>
              Login
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

export default SignUp;
