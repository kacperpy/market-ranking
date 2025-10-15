import React, { useDeferredValue, useMemo } from "react";

import useFetchMarketPairs from "@/api/hooks/useFetchMarketPairs";
import useFetchMarketSummary from "@/api/hooks/useFetchMarketSummary";
import globalStyles from "@/assets/globalStyles";
import { useSorting } from "@/context/SortingContext";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnrichedMarket } from "../../api/types";
import {
  calculateSpreadPercentage,
  ragFromSpread,
  toNumber,
} from "../../utils/utils";
import MarketList from "./components/MarketList";

export default function MarketListScreen() {
  const pairs = useFetchMarketPairs();
  const summary = useFetchMarketSummary();
  const loading = pairs.isLoading || summary.isLoading;

  const { sortKey, sortDirection, resetSort, filterName } = useSorting();

  const deferredFilterName = useDeferredValue(filterName);

  const onRefresh = () => {
    pairs.refetch();
    summary.refetch();
    resetSort();
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

  const filteredData = useMemo(() => {
    if (!deferredFilterName) return enrichedData;
    const lower = deferredFilterName.toLowerCase();
    return enrichedData.filter((item) =>
      item.tickerId.toLowerCase().includes(lower)
    );
  }, [enrichedData, deferredFilterName]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];

    sorted.sort((a, b) => {
      if (!sortKey || !sortDirection) return 0;

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
  }, [filteredData, sortKey, sortDirection]);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={globalStyles.backgroundWhite}
    >
      <StatusBar barStyle="dark-content" />
      <MarketList data={sortedData} loading={loading} onRefresh={onRefresh} />
    </SafeAreaView>
  );
}
