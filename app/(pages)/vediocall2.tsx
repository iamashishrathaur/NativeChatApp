import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Animated,
  PanResponder,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const VideoCallScreen = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [cameraFacing, setCameraFacing] = useState('front'); // 'front' or 'back'

  const smallVideoPosition = useRef(new Animated.ValueXY({ x: width - 120, y: 50 })).current;

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);
  const switchCamera = () =>
    setCameraFacing((prev) => (prev === 'front' ? 'back' : 'front'));

  // PanResponder for draggable small window
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: smallVideoPosition.x, dy: smallVideoPosition.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        smallVideoPosition.flattenOffset();
      },
      onPanResponderGrant: () => {
        smallVideoPosition.setOffset({
          x: smallVideoPosition.x._value,
          y: smallVideoPosition.y._value,
        });
        smallVideoPosition.setValue({ x: 0, y: 0 });
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* Hide the Status Bar */}
      <StatusBar hidden={true} />

      {/* Full-Screen Video */}
      <View style={styles.fullVideo}>
        <Text style={styles.videoText}>Remote Participant's Video</Text>
      </View>

      {/* Draggable Small Video */}
      <Animated.View
        style={[
          styles.smallVideo,
          { transform: smallVideoPosition.getTranslateTransform() },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.smallVideoContent}>
          {isCameraOn ? (
            <Text style={styles.videoText}>{cameraFacing} Camera Feed</Text>
          ) : (
            <Text style={styles.videoText}>Camera Off</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.switchCameraButton}
          onPress={switchCamera}
        >
          <Ionicons name="camera-reverse-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>

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
  smallVideo: {
    position: 'absolute',
    width: 100,
    height: 150,
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  smallVideoContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
  },
  switchCameraButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 15,
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
