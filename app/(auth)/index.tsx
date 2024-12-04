import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleActionButton=()=>{
      console.log(email);
     router.push('/home')
    }
  
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <View style={styles.form}>
          {/* App Logo */}
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="chat-outline" size={64} color="#6366F1" />
            <Text style={styles.appTitle}>QuickChat</Text>
          </View>

          {/* Form Title */}
          <Text style={styles.formTitle}>
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#4B5563" />
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={20} color="#4B5563" />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Additional Signup Field */}
          {!isLogin && (
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="account-outline" size={20} color="#4B5563" />
              <TextInput
                placeholder="Username"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          )}

          {/* Forgot Password */}
          {isLogin && (
            <TouchableOpacity activeOpacity={0.8} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {/* Main Action Button */}
          <TouchableOpacity activeOpacity={0.8}
            onPress={handleActionButton}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Toggle Between Login/Signup */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.toggleActionText}>
                {isLogin ? 'Sign Up' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Auth

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    form: {
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    appTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#374151',
      marginTop: 10,
    },
    formTitle: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      color: '#4B5563',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
    },
    input: {
      marginLeft: 10,
      flex: 1,
      color: '#374151',
      ...(Platform.OS === 'web' && {
        outlineStyle: 'none',
      }),
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 20,
    },
    forgotPasswordText: {
      color: '#6366F1',
      fontWeight: '600',
    },
    actionButton: {
      backgroundColor: '#6366F1',
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
    },
    actionButtonText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    toggleText: {
      color: '#6B7280',
    },
    toggleActionText: {
      color: '#6366F1',
      fontWeight: '600',
    },
  });