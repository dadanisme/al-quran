import { View, Text, Pressable, Animated, Easing } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./styles";
import { Colors } from "utils/colors";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

export default function DeteksiSuara() {
  const [isPressing, setIsPressing] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingResult, setRecordingResult] = useState<Audio.Sound | null>(
    null
  );

  const pressingAnimation = useRef(new Animated.Value(0)).current;

  const startRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording?.stopAndUnloadAsync();

      const { sound } = await recording?.createNewLoadedSoundAsync({
        volume: 1,
      });

      const uri = recording?.getURI();

      sound?.playAsync();

      setRecordingResult(sound);
    } catch (error) {
      console.log(error);
    }
  };

  // request permission
  useEffect(() => {
    Audio.requestPermissionsAsync();

    return () => {
      recording?.stopAndUnloadAsync();
    };
  }, []);

  useEffect(() => {
    Animated.timing(pressingAnimation, {
      toValue: isPressing ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [isPressing]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isPressing ? "Lepas untuk berhenti" : "Tekan dan tahan untuk merekam"}
      </Text>
      <Animated.View
        style={[
          styles.mic,
          {
            transform: [
              {
                scale: pressingAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                }),
              },
            ],
            backgroundColor: pressingAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [Colors.primary, Colors.lightSemiTransparent],
            }),
          },
        ]}
      >
        <Pressable
          style={styles.micButton}
          android_ripple={{
            color: Colors.lightSemiTransparent,
            borderless: true,
          }}
          onPressIn={() => {
            setIsPressing(true);
            startRecording();
          }}
          onPressOut={() => {
            setIsPressing(false);
            stopRecording();
          }}
        >
          <Ionicons
            name={isPressing ? "mic" : "mic-outline"}
            size={90}
            color={Colors.dark}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}
