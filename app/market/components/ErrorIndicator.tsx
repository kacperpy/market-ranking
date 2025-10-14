import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

interface ErrorIndicatorProps {
  error: Error | null;
  onRefresh: () => void;
}

const ErrorIndicator = ({ error, onRefresh }: ErrorIndicatorProps) => {
  return (
    <View style={styles.center}>
      <Text style={styles.errorText}>
        {String(error?.message || "Failed to load market depth")}
      </Text>
      <Text style={styles.link} onPress={onRefresh}>
        Tap to retry
      </Text>
    </View>
  );
};

export default ErrorIndicator;
