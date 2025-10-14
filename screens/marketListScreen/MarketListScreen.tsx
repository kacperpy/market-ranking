import React, { useMemo } from "react";

import useFetchMarketPairs from "@/api/hooks/useFetchMarketPairs";
import useFetchMarketSummary from "@/api/hooks/useFetchMarketSummary";
import { useSorting } from "@/context/SortingContext";
import { MarketList } from "@/screens/marketListScreen/components/MarketList";
import { calculateSpreadPercentage, ragFromSpread, toNumber } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnrichedMarket } from "../../api/types";

export default function MarketListScreen() {
  const pairs = useFetchMarketPairs();
  const summary = useFetchMarketSummary();
  const loading = pairs.isLoading || summary.isLoading;

  const { sortKey, sortDirection } = useSorting();

  const onRefresh = () => {
    pairs.refetch();
    summary.refetch();
  };

  const enrichedData: EnrichedMarket[] = useMemo(() => {
    if (!pairs.data.length || !summary.summary.length) {
      return [];
    }

    return pairs.data.map((pair) => {
      const summaryItem = summary.summary.find(
        (item) => item.trading_pairs?.replace("-", "_") === pair.ticker_id
      );

      const highestBid = toNumber(summaryItem?.highest_bid ?? null);
      const lowestAsk = toNumber(summaryItem?.lowest_ask ?? null);

      const spreadPercent = calculateSpreadPercentage(highestBid, lowestAsk);

      const ragStatus = ragFromSpread(spreadPercent);

      return {
        tickerId: pair.ticker_id,
        highestBid,
        lowestAsk,
        spreadPct: spreadPercent,
        rag: ragStatus,
      };
    });
  }, [pairs.data, summary.summary]);

  const sortedData = useMemo(() => {
    const sorted = [...enrichedData];

    sorted.sort((a, b) => {
      if (sortKey === "name") {
        return sortDirection === "ascending"
          ? a.tickerId.localeCompare(b.tickerId)
          : b.tickerId.localeCompare(a.tickerId);
      }
      if (sortKey === "spread") {
        const aVal = a.spreadPct ?? 0;
        const bVal = b.spreadPct ?? 0;
        return sortDirection === "ascending" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return sorted;
  }, [enrichedData, sortKey, sortDirection]);

  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <MarketList data={sortedData} loading={loading} onRefresh={onRefresh} />
    </SafeAreaView>
  );
}
