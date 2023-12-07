import { StyleSheet } from "react-native";
import { Colors } from "utils/colors";
import { Constants } from "utils/constants";

export default StyleSheet.create({
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
  searchButton: {},
});
