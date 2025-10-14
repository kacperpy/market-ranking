import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  label: {
    fontSize: 12,
    lineHeight: 15,
  },
  input: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(167, 167, 167, 0.5)",
    borderRadius: 10,
  },
  inputFocused: {
    borderColor: "#eb9525ff",
    backgroundColor: "#ffffff",
  },
});
