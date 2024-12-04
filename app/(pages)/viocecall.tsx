import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as Camera from 'expo-camera';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

const VideoCallScreen = ({ route, navigation }) => {
  // State Management
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  // WebRTC References
  const peerConnection = useRef(null);
  const callTimer = useRef(null);

  // Permissions and Stream Setup
  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();

      if (cameraStatus !== 'granted' || audioStatus !== 'granted') {
        Alert.alert(
          'Permissions Required', 
          'Camera and Microphone access are needed for video calls.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  };

  // Initialize Local Stream
  const startLocalStream = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: 500,
            minHeight: 300,
            minFrameRate: 30
          },
          facingMode: 'user'
        }
      });
      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error('Stream error:', error);
      Alert.alert('Stream Error', 'Unable to access camera and microphone.');
    }
  };

  // WebRTC Connection Setup
  const setupWebRTCConnection = async () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { 
          urls: 'turn:openrelay.metered.ca:80',
          username: 'openrelayproject',
          credential: 'openrelayproject'
        }
      ]
    };

    peerConnection.current = new RTCPeerConnection(configuration);

    // Add local stream tracks to peer connection
    if (localStream) {
      localStream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, localStream);
      });
    }

    // Handle remote stream
    peerConnection.current.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    // Connection state tracking
    peerConnection.current.onconnectionstatechange = (event) => {
      switch(peerConnection.current.connectionState) {
        case 'connected':
          setConnectionStatus('Connected');
          startCallTimer();
          break;
        case 'disconnected':
          setConnectionStatus('Disconnected');
          endCall();
          break;
      }
    };
  };

  // Call Timer Management
  const startCallTimer = () => {
    callTimer.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  // Format Call Duration
  const formatCallDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Call Control Methods
  const toggleMicrophone = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicMuted(!isMicMuted);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const endCall = () => {
    // Cleanup streams and connections
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    if (callTimer.current) {
      clearInterval(callTimer.current);
    }
    navigation.goBack();
  };

  // Initialize Call
  useEffect(() => {
    const initializeCall = async () => {
      const permissionsGranted = await requestPermissions();
      if (permissionsGranted) {
        const stream = await startLocalStream();
        await setupWebRTCConnection();
      }
    };

    initializeCall();

    return () => {
      endCall();
    };
  }, []);

  return (
    <LinearGradient 
      colors={['#1A1A2E', '#16213E']} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      {/* Video Streams */}
      <View style={styles.videoContainer}>
        {/* Local Stream */}
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.localStream}
            objectFit="cover"
          />
        )}

        {/* Remote Stream */}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteStream}
            objectFit="cover"
          />
        )}
      </View>

      {/* Call Info */}
      <View style={styles.callInfoContainer}>
        <Text style={styles.connectionStatus}>{connectionStatus}</Text>
        <Text style={styles.callDuration}>
          {formatCallDuration(callDuration)}
        </Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[
            styles.controlButton, 
            { backgroundColor: isMicMuted ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,255,0.2)' }
          ]} 
          onPress={toggleMicrophone}
        >
          <Ionicons 
            name={isMicMuted ? 'mic-off' : 'mic'} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.controlButton, 
            { backgroundColor: isCameraOff ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,255,0.2)' }
          ]} 
          onPress={toggleCamera}
        >
          <Ionicons 
            name={isCameraOff ? 'camera-off' : 'camera'} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.endCallButton} 
          onPress={endCall}
        >
          <Ionicons name="call" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  localStream: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 10,
    zIndex: 10,
  },
  remoteStream: {
    width: '100%',
    height: '100%',
  },
  callInfoContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
  },
  connectionStatus: {
    color: 'white',
    fontSize: 16,
  },
  callDuration: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  endCallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoCallScreen;