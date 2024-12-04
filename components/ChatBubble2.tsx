import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const ChatBubble2 = ({item}) => {
    const isOwnMessage = item.sender === 'me';
    
    return (
      <View style={[
        styles.messageBubbleContainer,
        isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer
      ]}>
        {!isOwnMessage && (
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }} 
            style={styles.avatar} 
          />
        )}
        
        <LinearGradient
          colors={isOwnMessage 
            ? ['#4A90E2', '#4A90E2'] 
            : ['#F0F0F0', '#E0E0E0']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.messageBubble,
            isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble
          ]}
        >
          <Text style={[
            styles.messageText,
            isOwnMessage ? styles.ownMessageText : styles.otherMessageText
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.timestampText,
            isOwnMessage ? styles.ownTimestampText : styles.otherTimestampText
          ]}>
            {item.timestamp}
          </Text>
        </LinearGradient>
      </View>
    );
}

export default ChatBubble2

const styles = StyleSheet.create({
    messageBubbleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
      },
      ownMessageContainer: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
      },
      otherMessageContainer: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
      },
      avatarContainer: {
        marginRight: 8,
        borderRadius: 20,
        width: 35,
        height: 35,
      },
      avatar:{
        marginRight: 8,
        width: 35, 
        height: 35, 
        borderRadius: 25
      },
      messageBubble: {
        maxWidth: '70%',
        borderRadius: 15,
        padding: 10,
        elevation: 2,
      },
      ownMessageBubble: {
        backgroundColor: '#4A90E2',
        borderBottomRightRadius: 5,
      },
      otherMessageBubble: {
        backgroundColor: '#F0F0F0',
        borderBottomLeftRadius: 5,
      },
      messageText: {
        fontSize: 16,
      },
      ownMessageText: {
        color: 'white',
      },
      otherMessageText: {
        color: '#333',
      },
      timestampText: {
        fontSize: 10,
        marginTop: 5,
        alignSelf: 'flex-end',
      },
      ownTimestampText: {
        color: 'rgba(255,255,255,0.7)',
      },
      otherTimestampText: {
        color: 'rgba(0,0,0,0.5)',
      },
})