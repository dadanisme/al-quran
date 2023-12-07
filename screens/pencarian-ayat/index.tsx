import { View, TextInput, KeyboardAvoidingView, Pressable } from "react-native";
import styles from "./styles";
import { Colors } from "utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function PencarianAyat() {
  const [search, setSearch] = useState("");

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
    </View>
  );
}
