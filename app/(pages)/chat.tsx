import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Image, 
  TouchableNativeFeedback, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard
} from 'react-native';
import ChatBubble2 from '@/components/ChatBubble2';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { initMessageDB, syncMessage } from '@/DB/messageDB';

// Mock data (replace with your actual data source)
const MOCK_MESSAGES = [
  { id: '1', text: 'Hey there! How are you?', sender: 'other', timestamp: '2:30 PM' },
  { id: '2', text: 'I\'m doing great, thanks for asking!', sender: 'me', timestamp: '2:31 PM' },
  { id: '3', text: 'Want to grab coffee later?', sender: 'other', timestamp: '2:32 PM' },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = async() => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {
      id: String(messages.length + 1),
      text: inputMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      receiver: '',  
      status:'', 
      image:'' 
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Scroll to bottom
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            {/* Back Button */}
            <View style={styles.backButtonContainer}>
              <TouchableNativeFeedback
                onPress={() => console.log('Back pressed')}
                background={TouchableNativeFeedback.Ripple('#ddd', true)}
              >
                <View style={styles.backButton}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </View>
              </TouchableNativeFeedback>
            </View>

            {/* Header Title and Avatar */}
            <View style={styles.headerTitleContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/40' }}
                style={styles.headerAvatar}
              />
              <View>
                <Text style={styles.headerTitle}>John Doe</Text>
                <Text style={styles.headerSubtitle}>Online</Text>
              </View>
            </View>

            {/* Header Actions */}
            <View style={styles.headerActions}>
              <TouchableNativeFeedback
                onPress={() => router.push('/videocall')}
                background={TouchableNativeFeedback.Ripple('#ddd', true)}
              >
                <View style={styles.iconButton}>
                  <MaterialIcons name="call" size={24} color="black" />
                </View>
              </TouchableNativeFeedback>
              
              <TouchableNativeFeedback
                onPress={() => {}}
                background={TouchableNativeFeedback.Ripple('#ddd', true)}
              >
                <View style={styles.iconButton}>
                  <Ionicons name="videocam" size={24} color="black" />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>

          {/* Messages List */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => <ChatBubble2 item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.attachButton}>
              <Text style={styles.attachButtonText}>+</Text>
            </TouchableOpacity>
            
            <View style={styles.textInputContainer}>
              <TextInput
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholder="Type a message..."
                style={styles.textInput}
                multiline={true}
              />
              <View style={styles.emojiButtonContainer}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#cccccc', true)}
                  onPress={() => console.log('Emoji button pressed!')}
                >
                  <View style={styles.emojiButton}>
                    <Entypo name="emoji-happy" size={24} color="#888" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
            
            <TouchableOpacity 
              activeOpacity={0.8}
              style={styles.sendButton}
              onPress={sendMessage}
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButtonContainer: {
    marginLeft: -10,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 15,
  },
  backButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#4A90E2',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 15, 
  },
  iconButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    marginHorizontal: 10,
  },
  
  messagesList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  attachButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  attachButtonText: {
    fontSize: 20,
    color: '#4A90E2',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
  },
  emojiButtonContainer: {
    margin: -8,
    borderRadius: 50, 
    overflow: 'hidden',
  },
  emojiButton: {
    padding: 8,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default ChatScreen;
