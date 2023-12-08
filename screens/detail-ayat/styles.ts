import { StyleSheet } from "react-native";
import { Colors } from "utils/colors";
import { Constants } from "utils/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  contentContainer: {
    padding: 20,
    gap: 10,
  },
  textContainer: {
    backgroundColor: Colors.white,
    borderRadius: Constants.borderRadius,
    borderWidth: 1,
    borderColor: Colors.dark,
    elevation: 2,
    padding: 10,
  },
  arabicText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "500",
    color: Colors.dark,
    textAlign: "right",
  },
  transliterationText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.dark,
    textAlign: "left",
    margin: 0,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
    textAlign: "center",
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  translationText: {
    margin: 0,
    marginTop: 10,
    fontSize: 14,
    color: Colors.dark,
    textAlign: "left",
  },
  audioHeader: {
    flexDirection: "row",
    width: "100%",
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    justifyContent: "center",
    gap: 2,
    paddingBottom: 10,
  },
  audioTextHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
  },
});
