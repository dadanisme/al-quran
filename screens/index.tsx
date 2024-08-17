import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "screens/home";
import DeteksiSuara from "./deteksi-suara";
import DeteksiGambar from "./deteksi-gambar";
import PencarianAyat from "./pencarian-ayat";
import { Colors } from "utils/colors";
import DetailAyat from "./detail-ayat";
import Login from "./auth/login";
import useUser from "hooks/use-user";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./home/styles";
import { ImageBackground } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  "Deteksi Suara": undefined;
  "Deteksi Gambar": undefined;
  "Pencarian Ayat": {
    arabic?: string;
    processingTime?: number;
    audioLength?: number;
  };
  "Detail Ayat": TypesenseAyat;
  Login: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Screens() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <LinearGradient
        colors={[Colors.dark, Colors.primary, Colors.light]}
        style={styles.container}
      >
        <ImageBackground
          source={require("assets/home.jpg")}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        ></ImageBackground>
      </LinearGradient>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Deteksi Suara" component={DeteksiSuara} />
            <Stack.Screen name="Deteksi Gambar" component={DeteksiGambar} />
            <Stack.Screen
              name="Pencarian Ayat"
              component={PencarianAyat}
              initialParams={{ arabic: undefined }}
            />
            <Stack.Screen
              name="Detail Ayat"
              component={DetailAyat}
              options={({ route }) => ({
                title: `(${route.params.surah}) ${route.params.nama_surah}: ${route.params.nomor}`,
              })}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
