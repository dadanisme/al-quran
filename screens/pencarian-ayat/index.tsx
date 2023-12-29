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
import { generateHTML } from "utils";
import { RootStackParamList } from "screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Pencarian Ayat">;

function PencarianAyat({ navigation, route }: Props) {
  const { arabic, processingTime, audioLength } = route.params;

  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const { width } = useWindowDimensions();

  const { data: result, isFetching } = useSearchQuery({
    q: value,
    query_by: "idn,tr,arWithoutDiacritics",
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
            <Text style={styles.arabicText}>{item.document.ar}</Text>
            <RenderHtml
              contentWidth={width}
              source={generateHTML(item, "tr")}
              tagsStyles={{ p: styles.transliterationText }}
            />
            <RenderHtml
              contentWidth={width}
              source={generateHTML(item, "idn", true)}
              tagsStyles={{ p: styles.translationText }}
            />
            <RenderHtml
              contentWidth={width}
              source={generateHTML(item, "arWithoutDiacritics")}
              tagsStyles={{ p: styles.transliterationText }}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

export default memo(PencarianAyat);
