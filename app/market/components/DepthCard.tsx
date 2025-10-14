import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

export type DepthStats = {
  bidsSum: number;
  asksSum: number;
  bidMin: number | null;
  bidMax: number | null;
  askMin: number | null;
  askMax: number | null;
};

interface DepthCardProps {
  stats: DepthStats;
  timestamp?: string;
}

const DepthCard = ({ stats, timestamp }: DepthCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Market depth</Text>
      <View style={styles.row}>
        <Text style={styles.label}>BIDs:</Text>
        <Text style={styles.value}>{stats.bidsSum}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>ASKs:</Text>
        <Text style={styles.value}>{stats.asksSum}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Price range (min–max)</Text>
      <View style={styles.row}>
        <Text style={styles.label}>BIDs:</Text>
        <Text style={styles.value}>
          {stats.bidMin ?? "-"} – {stats.bidMax ?? "-"}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>ASKs:</Text>
        <Text style={styles.value}>
          {stats.askMin ?? "-"} – {stats.askMax ?? "-"}
        </Text>
      </View>

      {timestamp && (
        <>
          <View style={styles.divider} />
          <Text style={styles.timestamp}>Updated: {timestamp}</Text>
        </>
      )}
    </View>
  );
};

export default DepthCard;
