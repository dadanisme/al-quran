import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Text,
  ImageBackground,
  PressableProps,
  Pressable,
  TextInput,
} from "react-native";
import { RootStackParamList } from "screens/index";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "utils/colors";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "services/firebase";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const Button = (props: PressableProps) => (
  <Pressable
    {...props}
    style={styles.menuButton}
    android_ripple={{ color: Colors.light }}
  />
);

export default function HomeScreen(props: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      props.navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

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
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Aplikasi pencarian ayat Al-Qur'an berbasis{" "}
            <Text style={styles.subtitleBold}>AI & Cloud</Text>
          </Text>
        </View>

        <View style={styles.menuContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.dark}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.dark}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Pressable style={styles.submitButton} onPress={handleLogin}>
            <Text style={styles.submitText}>Login</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
