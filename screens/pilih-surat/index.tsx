import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useMemo } from "react";
import { useAllSurahQuery } from "redux/services/e-quran";
import styles from "./styles";
import { RootStackParamList } from "screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "utils/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Pilih Surat">;

export default function PilihSurat({ navigation }: Props) {
  const { data, isLoading } = useAllSurahQuery();

  const dataByTwo = useMemo(() => {
    if (!data) return [];
    const result = [];
    for (let i = 0; i < data.length; i += 2) {
      result.push(data.slice(i, i + 2));
    }
    return result;
  }, [data]);

  const handlePress = (surah: Surah) => {
    navigation.navigate("Pilih Ayat", {
      nomor: surah.nomor,
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
            <Pressable
              style={styles.suratButton}
              onPress={() => handlePress(item[1])}
            >
              <Text style={styles.arabicText}>
                ({item[1].nomor}) {item[1].nama}
              </Text>
              <Text style={styles.translationText}>
                {item[1].nama_latin} | {item[1].jumlah_ayat} Ayat
              </Text>
            </Pressable>
            <Pressable
              style={styles.suratButton}
              onPress={() => handlePress(item[0])}
            >
              <Text style={styles.arabicText}>
                ({item[0].nomor}) {item[0].nama}
              </Text>
              <Text style={styles.translationText}>
                {item[0].nama_latin} | {item[0].jumlah_ayat} Ayat
              </Text>
            </Pressable>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
