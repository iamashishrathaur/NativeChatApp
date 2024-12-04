import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  SafeAreaView 
} from 'react-native';
// import { Search, MoreVertical, UserPlus, MessageCircle, Users, Settings } from 'lucide-react-native';

// Color Palette
const COLORS = {
  primary: '#5B2BF0',      // Deep vibrant purple
  secondary: '#7C3AED',    // Lighter purple
  background: '#F4F4F8',   // Soft light gray-blue
  text: '#1F2937',         // Dark slate gray
  textLight: '#6B7280',    // Medium gray
  white: '#FFFFFF',
  green: '#10B981',        // Modern green for online status
  accent: '#F43F5E'        // Vibrant pink-red for highlights
};

// Navigation Bar Component
const BottomNavBar = () => (
  <View style={styles.bottomNavBar}>
    <TouchableOpacity style={styles.navItem}>
    <Feather name="message-circle" size={24} color={COLORS.primary} />
      {/* <MessageCircle color={COLORS.primary} size={24} /> */}
      <Text style={styles.navItemText}>Chats</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
    <Feather name="users" size={24} color={COLORS.textLight} />
      <Text style={styles.navItemText}>Contacts</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
    <Feather name="settings" size={24} color={COLORS.textLight} />
      {/* <Settings color={COLORS.textLight} size={24} /> */}
      <Text style={styles.navItemText}>Settings</Text>
    </TouchableOpacity>
  </View>
);

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
  }
  ,
  { 
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
  ,
  { 
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
  ,
  { 
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
  ,
  { 
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
  ,
  { 
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
  ,
  { 
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
  ,
  { 
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
  ,
  { 
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
  ,
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
    id: '2', 
    name: 'Jane Smith', 
    lastMessage: 'Meeting at 2 PM', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    online: false,
    unreadCount: 0,
    timestamp: 'Yesterday'
  }
];

const ChatApp = () => {
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

  // Render individual chat item
  const ChatItem = ({ item}) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.avatar} 
        />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.chatDetails}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text 
            style={[
              styles.lastMessage, 
              item.unreadCount > 0 && styles.unreadMessage
            ]}
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        backgroundColor={COLORS.background} 
        barStyle="dark-content" 
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity activeOpacity={0.8} style={styles.headerIconButton}>
          <Feather name="user-plus" size={24} color={COLORS.primary} /> 
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.8} style={styles.headerIconButton}>
            <Feather name="more-vertical" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
      <Feather name="search" size={20} color={COLORS.textLight} style={styles.searchIcon}/>
        {/* <Search color={COLORS.textLight} size={20} style={styles.searchIcon} /> */}
        <TextInput 
          placeholder="Search users" 
          placeholderTextColor={COLORS.textLight}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Chat List */}
      <FlatList 
        data={filteredUsers}
        renderItem={ChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
      />

      {/* Bottom Navigation */}
      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16
  },
  headerIconButton: {
    padding: 8,
    backgroundColor: COLORS.background,
    borderRadius: 12
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text
  },
  chatList: {
    paddingHorizontal: 16
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.green,
    borderWidth: 2,
    borderColor: COLORS.white
  },
  chatDetails: {
    flex: 1
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text
  },
  timestamp: {
    fontSize: 14,
    color: COLORS.textLight
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4
  },
  lastMessage: {
    fontSize: 16,
    color: COLORS.textLight
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: COLORS.text
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  unreadText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold'
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  navItemText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4
  }
});

export default ChatApp;