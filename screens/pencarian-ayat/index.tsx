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
import { memo, useState } from "react";
import { useDebounce } from "use-debounce";

import { useSearchQuery } from "redux/services/typesense";
import RenderHtml from "react-native-render-html";
import { generateHTML } from "utils";

function PencarianAyat() {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const { width } = useWindowDimensions();

  const { data: result, isFetching } = useSearchQuery({
    q: value ?? "*",
    query_by: "idn,tr",
    page: 1,
    per_page: 30,
  });

  return (
    <View style={styles.container}>
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
            <Pressable style={styles.searchButton}>
              <Ionicons name="search" size={24} color={Colors.primary} />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>

      <FlatList
        style={styles.resultContainer}
        contentContainerStyle={styles.resultContentContainer}
        data={result?.hits}
        renderItem={({ item }) => (
          <Pressable
            style={styles.resultItem}
            android_ripple={{ color: Colors.lightSemiTransparent }}
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
              source={generateHTML(item, "idn")}
              tagsStyles={{ p: styles.translationText }}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

export default memo(PencarianAyat);
