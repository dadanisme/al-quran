import { StyleSheet } from "react-native";
import { Colors } from "utils/colors";
import { Constants } from "utils/constants";

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: 20,
  },
  searchContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: Constants.borderRadius,
    borderWidth: 1,
    borderColor: Colors.dark,
    elevation: 2,
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {},
  resultContainer: {
    flex: 1,
    marginTop: 20,
  },
  resultContentContainer: {
    width: "100%",
    gap: 5,
  },
  gridWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  suratButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    borderRadius: Constants.borderRadius,
    elevation: 2,
  },
  suratText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
    textAlign: "center",
  },
  arabicText: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
    textAlign: "center",
  },
  translationText: {
    margin: 0,
    fontSize: 12,
    color: Colors.dark,
    textAlign: "center",
  },
  resultInfoContainer: {
    width: "100%",
    marginTop: 3,
    alignItems: "center",
  },
  resultInfoText: {
    fontSize: 12,
    color: Colors.dark,
  },
  resultInfoTextHighlight: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.dark,
  },
});
