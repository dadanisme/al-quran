import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useMemo } from "react";
import { useAllSurahQuery, useSurahQuery } from "redux/services/e-quran";
import styles from "./styles";
import { RootStackParamList } from "screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { sliceText } from "utils";
import { Colors } from "utils/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Pilih Ayat">;

export default function PilihAyat({ navigation, route }: Props) {
  const { data, isLoading } = useSurahQuery(route.params.nomor);

  const dataByTwo = useMemo(() => {
    if (!data) return [];
    const result = [];
    for (let i = 0; i < data.ayat.length; i += 2) {
      result.push(data.ayat.slice(i, i + 2));
    }
    return result;
  }, [data]);

  const handlePress = (ayat: Ayat) => {
    navigation.navigate("Deteksi Suara", {
      nomor: data?.nomor,
      ayat: ayat.nomor,
      nama_surah: data?.nama_latin,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.resultContainer}
        contentContainerStyle={styles.resultContentContainer}
        data={dataByTwo}
        renderItem={({ item }) => (
          <View style={styles.gridWrapper}>
            {item[1] && (
              <Pressable
                style={styles.suratButton}
                onPress={() => handlePress(item[1])}
              >
                <Text style={styles.arabicText}>{item[1].nomor}</Text>
                <Text style={styles.translationText}>
                  {sliceText(item[1].ar)}
                </Text>
              </Pressable>
            )}
            <Pressable
              style={styles.suratButton}
              onPress={() => handlePress(item[0])}
            >
              <Text style={styles.arabicText}>{item[0].nomor}</Text>
              <Text style={styles.translationText}>
                {sliceText(item[0].ar)}
              </Text>
            </Pressable>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
