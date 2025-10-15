import { Input } from "@/components/Input/Input";
import { useSorting } from "@/context/SortingContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";

const Header = () => {
  const { sortKey, sortDirection, toggleSort, filterName, setFilterName } =
    useSorting();

  const getIndicator = (key: "name" | "spread") => {
    if (sortKey !== key) return "";
    if (!sortDirection) return "";
    return sortDirection === "ascending" ? " ↑" : " ↓";
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.filterContainer}>
        <Input
          label="Pair name"
          placeholder="DOGE/USDT"
          value={filterName}
          onChangeText={setFilterName}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => toggleSort("name")}
          style={{ flex: 1 }}
        >
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
    </View>
  );
};

export default Header;
