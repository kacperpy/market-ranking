import { useSorting } from "@/context/SortingContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Header = () => {
  const { sortKey, sortDirection, toggleSort } = useSorting();

  const getIndicator = (key: "name" | "spread") => {
    if (sortKey !== key) return "";

    return sortDirection === "ascending" ? " ↑" : " ↓";
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleSort("name")} style={{ flex: 1 }}>
        <Text style={[styles.text, styles.left]}>
          Market{getIndicator("name")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => toggleSort("spread")}
        style={styles.rightGroup}
      >
        <Text style={[styles.text, styles.right]}>
          Spread{getIndicator("spread")}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.text, styles.right]}>RAG</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    gap: 20,
  },
  text: {
    fontWeight: "700",
    fontSize: 14,
    color: "#222",
  },
  left: {
    textAlign: "left",
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  right: {
    textAlign: "right",
  },
});
