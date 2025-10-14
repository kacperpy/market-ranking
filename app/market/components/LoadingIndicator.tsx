import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

import styles from "../styles";

const LoadingIndicator = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator />
      <Text style={styles.muted}>Loading depth…</Text>
    </View>
  );
};

export default LoadingIndicator;
