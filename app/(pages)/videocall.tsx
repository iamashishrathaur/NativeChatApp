import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  Button
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';

const { width, height } = Dimensions.get('window');

const VideoCallScreen = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);

  return (
    <View style={styles.container}>
      {/* Full-Screen Video */}
      <View style={styles.fullVideo} facing='front'>
        {/* Placeholder for remote participant's video */}
        <Text style={styles.videoText}>Remote Participant's Video</Text>
      </View>

      {/* Local Video Feed */}
      <View style={styles.localVideo} >
      {isCameraOn ? (
          <CameraView style={styles.camera} key={'1'} facing={'front'}/>
        ) : (
          <Text style={styles.videoText}>Your Video</Text>
        )}
      </View>

      {/* Controls */}
      <SafeAreaView style={styles.controlsContainer}>
        <View style={styles.controls}>
          {/* Mute Button */}
          <TouchableOpacity activeOpacity={0.8}
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
            onPress={toggleMute}
          >
            <Feather name={isMuted ? 'mic-off' : 'mic'} size={24} color="#FFF" />
          </TouchableOpacity>

          {/* Camera Button */}
          <TouchableOpacity activeOpacity={0.8}
            style={[styles.controlButton, !isCameraOn && styles.controlButtonActive]}
            onPress={toggleCamera}
          >
            <Feather  name={isCameraOn ? 'camera' : 'camera-off'} size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}
            style={[styles.controlButton, !isSpeakerOn && styles.controlButtonActive]}
            onPress={toggleSpeaker}
          >
            <Ionicons name={isSpeakerOn ? 'volume-high' : 'volume-mute'} size={24} color="#FFF" />
          </TouchableOpacity>

          {/* End Call Button */}
          <TouchableOpacity activeOpacity={0.8} style={styles.endCallButton} onPress={() => router.back()}>
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
 
  localVideo: {
    position: 'absolute',
    top: 30,
    right: 20,
    width: width * 0.3,
    height: height * 0.2,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  camera:{
    flex:1,
    width:'100%',
    height:'100%',
    borderRadius: 10
   },

  videoText: {
    color: '#FFF',
    fontSize: 14,
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
