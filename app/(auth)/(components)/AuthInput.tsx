import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AuthInput = ({ icon, placeholder, value, onChangeText, secureTextEntry = false, keyboardType,isLoading=false}) => {
  return (
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons name={icon} size={20} color="#4B5563" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType || 'default'}
        autoCapitalize="none"
        readOnly={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AuthInput;
