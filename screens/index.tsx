import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "screens/home";
import DeteksiSuara from "./deteksi-suara";
import DeteksiGambar from "./deteksi-gambar";
import PencarianAyat from "./pencarian-ayat";
import { Colors } from "utils/colors";
import DetailAyat from "./detail-ayat";

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
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
