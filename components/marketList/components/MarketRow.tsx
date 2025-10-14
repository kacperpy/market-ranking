import { prettyTicker } from "@/utils";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EnrichedMarket } from "../../../api/types";

type Props = {
  item: EnrichedMarket;
  onPress: () => void;
};

const ragColor = (rag: EnrichedMarket["rag"]) =>
  rag === "Green" ? "#16a34a" : rag === "Amber" ? "#f59e0b" : "#ef4444";

export default function MarketRow({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.ticker}>{prettyTicker(item.tickerId)}</Text>
        <Text style={styles.sub}>
          BID: {item.highestBid ?? "-"} | ASK: {item.lowestAsk ?? "-"}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.spread}>
          {item.spreadPct === null ? "-" : `${item.spreadPct?.toFixed(2)}%`}
        </Text>
        <View style={[styles.dot, { backgroundColor: ragColor(item.rag) }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "white",
  },
  left: { flexShrink: 1 },
  ticker: { fontSize: 16, fontWeight: "600" },
  sub: { color: "#6b7280", marginTop: 4 },
  right: { flexDirection: "row", alignItems: "center", gap: 8 },
  spread: { fontVariant: ["tabular-nums"], fontSize: 15 },
  dot: { width: 12, height: 12, borderRadius: 6 },
});
