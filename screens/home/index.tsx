import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Text,
  ImageBackground,
  PressableProps,
  Pressable,
  Linking,
} from "react-native";
import { RootStackParamList } from "screens/index";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "utils/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Button = (props: PressableProps) => (
  <Pressable
    {...props}
    style={styles.menuButton}
    android_ripple={{ color: Colors.light }}
  />
);

export default function HomeScreen(props: Props) {
  const menus = [
    {
      text: "Pencarian Ayat",
      screen: "Pencarian Ayat",
    },
    {
      text: "Deteksi Suara",
      screen: "Deteksi Suara",
    },
    // {
    //   text: "Deteksi Gambar (Coming Soon)",
    //   screen: "Deteksi Gambar",
    //   disabled: true,
    // },
  ];

  return (
    <LinearGradient
      colors={[Colors.dark, Colors.primary, Colors.light]}
      style={styles.container}
    >
      <ImageBackground
        source={require("assets/home.jpg")}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>AyaSeek AI</Text>
          <Text style={styles.subtitle}>
            Aplikasi pencarian ayat Al-Qur'an berbasis{" "}
            <Text style={styles.subtitleBold}>AI & Cloud</Text>
          </Text>
        </View>

        <View style={styles.menuContainer}>
          {menus.map((menu, index) => (
            <Button
              key={index}
              onPress={() => props.navigation.navigate(menu.screen as never)}
              // disabled={menu.disabled}
            >
              <Text style={styles.menuText}>{menu.text}</Text>
            </Button>
          ))}
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>&copy; 2023 by </Text>
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/dadanisme")
            }
          >
            <Text style={styles.footerTextBold}>Muhammad Ramdan</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
