import { StyleSheet } from "react-native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b3b3b4d",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: WINDOW_WIDTH * 0.8,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  btn: {
    width: "100%",
    height: 40,
    columnGap: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  txtBtn: {
    fontFamily: "SairaCondensed-Medium",
    fontSize: 20,
  },
});
export default styles;
