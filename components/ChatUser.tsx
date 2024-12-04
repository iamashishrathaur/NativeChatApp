import { Redirect, router } from 'expo-router';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

interface User {
  name: string;
  lastMessage: string;
  avatar: string;
  online: boolean;
  unreadCount: number;
  timestamp: string;
}

interface ChatUserProps {
  user: User;
}

const ChatUser: FC<ChatUserProps> = ({ user }) => {
  const { name, lastMessage, avatar, online, unreadCount, timestamp } = user;

  return (
    <TouchableNativeFeedback
      onPress={() => {router.navigate('/chat')}}  // Define your onPress logic here
      background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.1)', false)}   // Ripple effect color
    >
      <View style={styles.chatItem}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          {online && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.chatDetails}>
          <View style={styles.chatHeader}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
          <View style={styles.chatFooter}>
            <Text style={[styles.lastMessage, unreadCount > 0 && styles.lastMessage]}>
              {lastMessage}
            </Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ChatUser;

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:16,
    paddingVertical: 12,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatDetails: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  lastMessage: {
    fontWeight: '400',
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
