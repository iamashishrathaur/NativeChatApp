import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleNavItemPress = (tab: string) => {
    setActiveTab(tab);
  };

  const NavItem = ({ 
    name, 
    icon: Icon, 
    iconLibrary, 
    label 
  }: { 
    name: string, 
    icon: any, 
    iconLibrary: string, 
    label: string 
  }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.7}
        style={[styles.navItemContainer, activeTab === name && styles.activeNavItem]}
        onPress={() => handleNavItemPress(name)}
      >
        <Icon 
          name={iconLibrary} 
          size={28} 
          color={activeTab === name ? '#007AFF' : '#8E8E93'} 
        />
        <Text 
          style={[styles.navText, activeTab === name && styles.activeNavText]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <NavItem 
        name="home" 
        icon={MaterialIcons} 
        iconLibrary="home" 
        label="Home" 
      />
      <NavItem 
        name="search" 
        icon={Ionicons} 
        iconLibrary="search" 
        label="Discover" 
      />
      <NavItem 
        name="history" 
        icon={Feather} 
        iconLibrary="clock" 
        label="Activity" 
      />
      <NavItem 
        name="profile" 
        icon={MaterialIcons} 
        iconLibrary="person" 
        label="Profile" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  navItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
    width:78
  },
  activeNavItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 8,
  },
  navText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '400',
    marginTop: 4,
  },
  activeNavText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default BottomNavbar;
