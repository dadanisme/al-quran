import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "screens";
import styles from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Audio } from "expo-av";
import { useEffect, useMemo, useState } from "react";
import { Colors } from "utils/colors";
import { useSoundQuery } from "redux/services/al-quran-cloud";
import RenderHtml from "react-native-render-html";
import { generateHTML } from "utils";

const tagsStyles = { p: styles.arabicText };
const transliterationTagsStyles = { p: styles.transliterationText };

type Props = NativeStackScreenProps<RootStackParamList, "Detail Ayat">;

export default function DetailAyat({ route }: Props) {
  const { item, percentage, ...ayat } = route.params;
  const [loadingSound, setLoadingSound] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { width } = useWindowDimensions();

  const { data, isLoading } = useSoundQuery(ayat.itemId);

  const loading = useMemo(
    () => isLoading || loadingSound,
    [isLoading, loadingSound]
  );

  useEffect(() => {
    if (!data) return;
    (async () => {
      setLoadingSound(true);
      const { sound } = await Audio.Sound.createAsync(
        { uri: data },
        { shouldPlay: false },
        (status) => {
          if ("didJustFinish" in status && status.didJustFinish) {
            setIsPlaying(false);
          }
        }
      );

      setSound(sound);
      setLoadingSound(false);
    })();
  }, [data]);

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.textContainer}>
        <View style={styles.audioHeader}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.dark} />
          ) : (
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={24}
              color={Colors.dark}
              onPress={() => {
                if (isPlaying) {
                  stopSound();
                } else {
                  playSound();
                }
              }}
            />
          )}
          <Text style={styles.audioTextHeader}>Ayat</Text>
        </View>
        {item ? (
          <RenderHtml
            contentWidth={width}
            source={generateHTML(item, "ar")}
            tagsStyles={tagsStyles}
          />
        ) : (
          <Text style={styles.arabicText}>{ayat.ar}</Text>
        )}
        <Text style={styles.transliterationText}>{ayat.tr}</Text>

        {percentage !== undefined ? (
          <View style={styles.accuracyContainer}>
            <Text style={styles.accuracyText}>
              Akurasi:{" "}
              <Text
                style={
                  percentage > 90
                    ? styles.accuracyTextSuccess
                    : percentage > 70
                    ? styles.accuracyTextWarning
                    : styles.accuracyTextFail
                }
              >
                {percentage.toFixed(2)}%
              </Text>
            </Text>
            {item ? (
              <RenderHtml
                contentWidth={width}
                source={generateHTML(item, "arWithoutDiacritics")}
                tagsStyles={transliterationTagsStyles}
              />
            ) : null}
          </View>
        ) : null}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>Terjemahan</Text>
        <Text style={styles.translationText}>{ayat.idn}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>Tafsir</Text>
        <Text style={styles.translationText}>{ayat.tafsir}</Text>
      </View>
    </ScrollView>
  );
}
