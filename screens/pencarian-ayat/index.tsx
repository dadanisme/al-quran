import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { Colors } from "utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useLocalSurahQuery } from "redux/services/e-quran";
import { useDebounce } from "use-debounce";

export default function PencarianAyat() {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);

  const { data, isLoading } = useLocalSurahQuery();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.searchContainer}
        contentContainerStyle={styles.inputContainer}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Cari transliterasi, terjemahan, atau tafsir..."
            cursorColor={Colors.primary}
            enterKeyHint="search"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <Pressable style={styles.searchButton}>
            <Ionicons name="search" size={24} color={Colors.primary} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </View>
  );
}
