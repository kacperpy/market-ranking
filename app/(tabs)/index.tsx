import React, { useMemo } from "react";

import useFetchMarketPairs from "@/api/hooks/useFetchMarketPairs";
import useFetchMarketSummary from "@/api/hooks/useFetchMarketSummary";
import { MarketList } from "@/components/marketList/MarketList";
import { calculateSpreadPercentage, ragFromSpread, toNumber } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnrichedMarket } from "../../api/types";

export default function MarketListScreen() {
  const pairs = useFetchMarketPairs();
  const summary = useFetchMarketSummary();
  const loading = pairs.isLoading || summary.isLoading;

  const onRefresh = () => {
    pairs.refetch();
    summary.refetch();
  };

  const data: EnrichedMarket[] = useMemo(() => {
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

  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <MarketList data={data} loading={loading} onRefresh={onRefresh} />
    </SafeAreaView>
  );
}
