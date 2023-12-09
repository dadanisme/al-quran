import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./styles";
import { Colors } from "utils/colors";
import { useEffect, useMemo, useRef, useState } from "react";
import { Audio } from "expo-av";
import { useJobQuery } from "redux/services/neuralspace";
import { useCreateJobMutation } from "redux/services/server";
import { convertProgress } from "utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "screens";

type Props = NativeStackScreenProps<RootStackParamList, "Deteksi Suara">;

export default function DeteksiSuara({ navigation }: Props) {
  const [isPressing, setIsPressing] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [stopFetching, setStopFetching] = useState(false);
  const [loadingProcessing, setLoadingProcessing] = useState(false);

  const [createJob, { isLoading }] = useCreateJobMutation();
  const { data: job, isFetching } = useJobQuery(jobId!, {
    skip: !jobId || stopFetching,
    pollingInterval: 1000,
  });

  const pressingAnimation = useRef(new Animated.Value(0)).current;

  const loading = useMemo(() => {
    if (loadingProcessing) return true;
    if (!jobId) return false;
    return isFetching || isLoading || job?.data.status !== "Completed";
  }, [isFetching, isLoading, job, jobId, loadingProcessing]);

  const startRecording = async () => {
    try {
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      setLoadingProcessing(true);
      setStopFetching(false);
      setJobId(null);
      await recording?.stopAndUnloadAsync();

      // get buffer
      const uri = recording.getURI();
      const response = await fetch(String(uri));
      const blob = await response.blob();

      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(String(reader.result));
        };
        reader.onerror = reject;
      });

      const res = await createJob(
        base64.replace(/^data:audio\/\w+;base64,/, "")
      );

      if ("data" in res) setJobId(res.data.data.jobId);

      setLoadingProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };

  // request permission
  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);

  useEffect(() => {
    Animated.timing(pressingAnimation, {
      toValue: isPressing ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [isPressing]);

  useEffect(() => {
    if (job?.data.status === "Completed") {
      setStopFetching(true);
      navigation.navigate("Pencarian Ayat", {
        arabic: job?.data.result.transcription.transcript,
      });
    }
  }, [job]);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={[styles.title, { marginTop: 20 }]}>
          {convertProgress(
            jobId
              ? String(job?.data.status ?? "Memproses rekaman")
              : "Memproses rekaman"
          ) ?? "Memproses rekaman"}
        </Text>
      </View>
    );

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
          onLongPress={() => {
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
