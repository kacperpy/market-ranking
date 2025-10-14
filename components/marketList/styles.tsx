import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  text: {
    fontWeight: "700",
    fontSize: 14,
    color: "#222",
  },
  marketColumn: {
    flex: 1,
    textAlign: "left",
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {
    textAlign: "right",
    minWidth: 60,
  },
});
