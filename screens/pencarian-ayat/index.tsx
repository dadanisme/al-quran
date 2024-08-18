import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";
import styles from "./styles";
import { Colors } from "utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { memo, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { useSearchQuery } from "redux/services/typesense";
import RenderHtml from "react-native-render-html";
import { generateHTML, removeDiactritics } from "utils";
import { RootStackParamList } from "screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { distance } from "fastest-levenshtein";

const arabicTagsStyles = { p: styles.arabicText };
const transliterationTagsStyles = { p: styles.transliterationText };
const translationTagsStyles = { p: styles.translationText };

type Props = NativeStackScreenProps<RootStackParamList, "Pencarian Ayat">;

function PencarianAyat({ navigation, route }: Props) {
  const { arabic, processingTime, audioLength, nomor, ayat } = route.params;

  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const { width } = useWindowDimensions();

  const { data: result, isFetching } = useSearchQuery({
    q: value,
    query_by: "idn,tr,arWithoutDiacritics,ar",
    page: 1,
    per_page: 30,
  });

  const { time, found } = useMemo(() => {
    if (!result) return { time: 0, found: 0 };
    return { time: result.search_time_ms, found: result.found };
  }, [result]);

  useEffect(() => {
    if (arabic) setSearch(arabic);
  }, [arabic]);

  useEffect(() => {
    if (nomor && ayat) {
      const bestResult = result?.hits?.[0].document;

      if (bestResult) {
        let percentage = 0;
        if (bestResult?.nomor === ayat && bestResult?.surah === nomor) {
          const distanceArabic = distance(
            removeDiactritics("مِنَ الْجِنَّةِ وَالنَّاسِ").trim(),
            bestResult?.arWithoutDiacritics.trim()
          );

          // Calculate the percentage of similarity
          percentage = 1 - distanceArabic / Math.max(bestResult?.ar?.length, 1);
        }

        navigation.navigate("Detail Ayat", {
          ...bestResult,
          item: result?.hits?.[0],
          percentage: percentage * 100,
        });
      }
    }
  }, [nomor, ayat, result]);

  return (
    <View style={styles.container}>
      {processingTime && audioLength && search === arabic && (
        <View
          style={[
            styles.resultInfoContainer,
            { marginTop: 0, marginBottom: 20 },
          ]}
        >
          <Text style={styles.resultInfoText}>
            Audio{" "}
            <Text style={styles.resultInfoTextHighlight}>
              {(audioLength / 1000).toFixed(2)} detik
            </Text>{" "}
            diproses dalam{" "}
            <Text style={styles.resultInfoTextHighlight}>
              {(processingTime / 1000).toFixed(2)} detik
            </Text>
          </Text>
        </View>
      )}
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.searchContainer}
        contentContainerStyle={styles.inputContainer}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Cari terjemahan atau transliterasi"
            cursorColor={Colors.primary}
            enterKeyHint="search"
            value={search}
            onChangeText={(text) => setSearch(text)}
            autoFocus
          />
          {isFetching ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <Pressable
              style={styles.closeButton}
              android_ripple={{ color: Colors.lightSemiTransparent }}
              onPress={() => setSearch("")}
            >
              <Ionicons
                name={search.length > 0 ? "close-circle" : "search"}
                size={24}
                color={Colors.primary}
              />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>

      <View style={styles.resultInfoContainer}>
        <Text style={styles.resultInfoText}>
          <Text style={styles.resultInfoTextHighlight}>{found}</Text> hasil
          ditemukan dalam{" "}
          <Text style={styles.resultInfoTextHighlight}>{time} milidetik</Text>
        </Text>
      </View>

      <FlatList
        style={styles.resultContainer}
        contentContainerStyle={styles.resultContentContainer}
        data={result?.hits}
        renderItem={({ item }) => (
          <Pressable
            style={styles.resultItem}
            android_ripple={{ color: Colors.lightSemiTransparent }}
            onPress={() => navigation.navigate("Detail Ayat", item.document)}
          >
            <Text style={styles.suratText}>
              {item.document.nama_surah}:{item.document.nomor}
            </Text>
            <RenderHtml
              contentWidth={width}
              source={generateHTML(item, "ar")}
              tagsStyles={arabicTagsStyles}
            />
            <RenderHtml
              contentWidth={width}
              source={generateHTML(item, "tr")}
              tagsStyles={transliterationTagsStyles}
            />
            <RenderHtml
              contentWidth={width}
              source={generateHTML(item, "idn", true)}
              tagsStyles={translationTagsStyles}
            />
            <RenderHtml
              contentWidth={width}
              source={generateHTML(item, "arWithoutDiacritics")}
              tagsStyles={transliterationTagsStyles}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

export default memo(PencarianAyat);
