import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

export const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.marketColumn]}>Market</Text>
      <View style={styles.rightGroup}>
        <Text style={[styles.text, styles.rightText]}>Spread</Text>
        <Text style={[styles.text, styles.rightText]}>RAG</Text>
      </View>
    </View>
  );
};
