import { StatusBar, StyleSheet } from "react-native";
import { Colors } from "utils/colors";
import { Constants } from "utils/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  backgroundImageStyle: {
    opacity: 0.5,
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.dark,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: Colors.dark,
    textAlign: "center",
  },
  subtitleBold: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.dark,
    textAlign: "center",
  },
  menuContainer: {
    width: "100%",
    alignItems: "center",
  },
  menuButton: {
    borderColor: Colors.dark,
    borderWidth: 1.3,
    backgroundColor: Colors.lightSemiTransparent,
    borderRadius: Constants.borderRadius,
    paddingVertical: 10,
    width: "70%",
  },
  menuText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.dark,
    textTransform: "uppercase",
    textAlign: "center",
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    flexDirection: "row",
  },
  footerText: {
    fontSize: 12,
    color: Colors.dark,
    textAlign: "center",
  },
  footerTextBold: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.dark,
    textAlign: "center",
  },

  // forms
  input: {
    borderColor: Colors.dark,
    borderWidth: 1.3,
    backgroundColor: Colors.lightSemiTransparent,
    borderRadius: Constants.borderRadius,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "70%",
    marginBottom: 10,
  },
  submitButton: {
    borderColor: Colors.dark,
    borderWidth: 1.3,
    backgroundColor: Colors.light,
    borderRadius: Constants.borderRadius,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "70%",
    marginBottom: 10,
  },
  submitText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.dark,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
