import { View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "screens";
import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Detail Ayat">;

export default function DetailAyat({ navigation, route }: Props) {
  const ayat = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>Ayat</Text>
        <Text style={styles.arabicText}>{ayat.ar}</Text>
        <Text style={styles.transliterationText}>{ayat.tr}</Text>
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
