import { prettyTicker } from "@/utils/utils";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { EnrichedMarket } from "../../../api/types";
import styles from "../styles";

type Props = {
  item: EnrichedMarket;
  onPress: () => void;
};

const ragColor = (rag: EnrichedMarket["rag"]) =>
  rag === "Green" ? "#16a34a" : rag === "Amber" ? "#f59e0b" : "#ef4444";

export default function MarketRow({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View>
        <Text style={styles.ticker}>{prettyTicker(item.tickerId)}</Text>
        <Text style={styles.sub}>
          BID: {item.highestBid ?? "-"} | ASK: {item.lowestAsk ?? "-"}
        </Text>
      </View>
      <View style={styles.rightStats}>
        <Text style={styles.spread}>
          {item.spreadPct === null ? "-" : `${item.spreadPct?.toFixed(2)}%`}
        </Text>
        <View style={[styles.dot, { backgroundColor: ragColor(item.rag) }]} />
      </View>
    </Pressable>
  );
}
