import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// const { width } = Dimensions.get('window');

const ChatBubble = ({item}) => {
    const { text,me, avatar,timestamp,messageType = 'text',status = 'sent'} = item
  const StatusIndicator = () => {
    const getStatusColor = () => {
      switch(status) {
        case 'sent': return '#A0A0A0';
        case 'delivered': return '#4A90E2';
        case 'read': return '#4CAF50';
        default: return '#A0A0A0';
      }
    };

    return (
      <View 
        style={[
          styles.statusIndicator, 
          { backgroundColor: getStatusColor() }
        ]}
      />
    );
  };

  return (
    <View style={[
      styles.container, 
      me ? styles.ownMessageContainer : styles.otherMessageContainer
    ]}>
      {!me && avatar && (
        <View style={styles.avatarContainer}>
          {/* {avatar} */}
          <Image 
            source={{uri: avatar}} 
            style={styles.avatar}
          />
        </View>
      )}
      
      <View
        style={[
          styles.bubbleContainer, 
          me ? styles.ownBubble : styles.otherBubble,
          me ? styles.ownBubbleTail : styles.otherBubbleTail
        ]}
      >
        <View style={styles.contentContainer}>
          {messageType === 'text' && (
            <Text 
              numberOfLines={3} 
              ellipsizeMode="tail"
              style={[
                styles.messageText, 
                me ? styles.ownMessageText : styles.otherMessageText
              ]}
            >
              {text}
            </Text>
          )}
          
          <View style={styles.bubbleFooter}>
            <Text style={[
              styles.timestampText, 
              me ? styles.ownTimestampText : styles.otherTimestampText
            ]}>
              {timestamp}
            </Text>
            {me && <StatusIndicator />}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  ownMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
    borderRadius: 20,
    width: 35,
    height: 35,
  },
  avatar:{
    width: 35, 
    height: 35, 
    borderRadius: 25
  },
  bubbleContainer: {
    maxWidth: '70%',
    minWidth: 10,
    padding: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentContainer: {
    flexDirection: 'column',
  },
  ownBubble: {
    backgroundColor: '#4A90E2',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  otherBubble: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  ownBubbleTail: {
    borderBottomRightRadius: 0,
  },
  otherBubbleTail: {
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 5,
  },
  ownMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: '#333',
  },
  bubbleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestampText: {
    fontSize: 10,
    opacity: 0.7,
  },
  ownTimestampText: {
    color: 'rgba(255,255,255,0.7)',
    marginRight: 5,
  },
  otherTimestampText: {
    color: 'rgba(0,0,0,0.5)',
    marginRight: 5,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default ChatBubble;