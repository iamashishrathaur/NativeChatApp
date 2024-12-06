import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,  
  TextInput, 
  FlatList,  
  StyleSheet, 
  StatusBar, 
  SafeAreaView, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ChatUser from '@/components/ChatUser';
import BottomNavBar from '@/components/BottomNavBar';

// Dummy data - replace with actual user and chat data
const USERS = [
  { 
    id: '1', 
    name: 'John Doe', 
    lastMessage: 'Hey, how are you?', 
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
    online: true,
    unreadCount: 2,
    timestamp: '10:30 AM'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  },
  { 
    id: '3', 
    name: 'John Doe', 
    lastMessage: 'Hey, how are you?', 
    avatar: '', 
    online: true,
    unreadCount: 2,
    timestamp: '10:30 AM'
  },
  { 
    id: '4', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  },
  { 
    id: '5', 
    name: 'John Doe', 
    lastMessage: 'Hey, how are you?', 
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
    online: true,
    unreadCount: 2,
    timestamp: '10:30 AM'
  },
  { 
    id: '6', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  },
  { 
    id: '7', 
    name: 'John Doe', 
    lastMessage: 'Hey, how are you?', 
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
    online: true,
    unreadCount: 2,
    timestamp: '10:30 AM'
  },
  { 
    id: '8', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  },{ 
    id: '9', 
    name: 'John Doe', 
    lastMessage: 'Hey, how are you?', 
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
    online: true,
    unreadCount: 2,
    timestamp: '10:30 AM'
  },
  { 
    id: '10', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  },{ 
    id: '11', 
    name: 'John Doe', 
    lastMessage: 'Hey, how are you?', 
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
    online: true,
    unreadCount: 2,
    timestamp: '10:30 AM'
  },
  { 
    id: '12', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(USERS);

  // Search functionality
  useEffect(() => {
    if (searchQuery) {
      const filtered = USERS.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(USERS);
    }
  }, [searchQuery]);

  return (
       <SafeAreaView style={styles.container}>
        <StatusBar 
          backgroundColor="#FFFFFF" 
          barStyle="dark-content" 
        />
    
          <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>xChats</Text>
              <View style={styles.headerIcons}>
                <TouchableNativeFeedback 
                  background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.2)', true)} // Ripple bound to child
                  useForeground={true} 
                >
                  <View style={styles.iconWrapper}>
                    <Feather name="user-plus" size={22} color="#000" />
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback 
                  background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.2)', true)} 
                  useForeground={true}
                >
                  <View style={styles.iconWrapper}>
                    <Feather name="more-vertical" size={22} color="#000" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
            {/* Search Bar and Chat List */}
            <ScrollView 
              style={styles.container} 
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput 
                  placeholder="Search users" 
                  placeholderTextColor="#888"
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <FlatList
                data={filteredUsers}
                renderItem={({ item }) => <ChatUser user={item} />}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </ScrollView>
  
          </KeyboardAvoidingView>
          {/* Bottom Navigation Bar */}
          <BottomNavBar />
       </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16
  },
  iconWrapper: {
    padding: 2, 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginInline: 16,
    marginBottom:16,
    marginTop:5,
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000'
  },

  
});

export default Home;