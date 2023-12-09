import { StyleSheet } from "react-native";
import { Colors } from "utils/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    alignItems: "center",
    justifyContent: "center",
  },
  mic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.dark,
  },
  micPressing: {
    backgroundColor: Colors.dark,
    transform: [{ scale: 0.95 }],
  },
  micButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark,
    width: "80%",
    textAlign: "center",
    marginBottom: 30,
    height: 50,
  },
});
