import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  StatusBar, 
  Animated, 
  Easing
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const VideoCallScreen = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [ringingAnimation] = useState(new Animated.Value(0));

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);

  const startRingingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ringingAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(ringingAnimation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  React.useEffect(() => {
    startRingingAnimation();
  }, []);

  const ringScale = ringingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <View style={styles.container}>
      {/* Hide the Status Bar */}
      <StatusBar hidden={true} />

      {/* Full-Screen Video */}
      <View style={styles.fullVideo}>
        <Text style={styles.videoText}>Remote Participant's Video</Text>
      </View>

      {/* Ringing Avatar */}
      <View style={styles.avatarContainer}>
        <Animated.View
          style={[
            styles.ring,
            {
              transform: [{ scale: ringScale }],
              opacity: ringingAnimation,
            },
          ]}
        />
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>RP</Text>
        </View>
      </View>

      {/* Controls */}
      <SafeAreaView style={styles.controlsContainer}>
        <View style={styles.controls}>
          {/* Mute Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
            onPress={toggleMute}
          >
            <Feather name={isMuted ? 'mic-off' : 'mic'} size={24} color="#FFF" />
          </TouchableOpacity>

          {/* Camera Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.controlButton, !isCameraOn && styles.controlButtonActive]}
            onPress={toggleCamera}
          >
            <Feather name={isCameraOn ? 'camera' : 'camera-off'} size={24} color="#FFF" />
          </TouchableOpacity>

          {/* Speaker Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.controlButton, !isSpeakerOn && styles.controlButtonActive]}
            onPress={toggleSpeaker}
          >
            <Ionicons name={isSpeakerOn ? 'volume-high' : 'volume-mute'} size={24} color="#FFF" />
          </TouchableOpacity>

          {/* End Call Button */}
          <TouchableOpacity activeOpacity={0.8} style={styles.endCallButton}>
            <MaterialIcons name="call-end" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  videoText: {
    color: '#FFF',
    fontSize: 14,
  },
  avatarContainer: {
    position: 'absolute',
    top: height / 4,
    left: width / 2 - 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 24,
    color: '#444',
    fontWeight: 'bold',
  },
  controlsContainer: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    width: 60,
    height: 60,
    backgroundColor: '#444',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: '#888',
  },
  endCallButton: {
    width: 60,
    height: 60,
    backgroundColor: '#E53935',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoCallScreen;
