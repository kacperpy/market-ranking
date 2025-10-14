import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { RefreshControl, ScrollView } from "react-native";

import useFetchMarketDepth from "@/api/hooks/useFetchMarketDepth";
import globalStyles from "@/assets/globalStyles";
import {
  formatTimestamp,
  normalizeDepth,
  priceRange,
  sumQuantity,
} from "@/utils";
import DepthCard from "./components/DepthCard";
import ErrorIndicator from "./components/ErrorIndicator";
import Header from "./components/Header";
import LoadingIndicator from "./components/LoadingIndicator";
import styles from "./styles";

const MarketDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isError, error, refetch } = useFetchMarketDepth(id);

  const onRefresh = () => {
    refetch();
  };

  const stats = useMemo(() => {
    if (!data) return null;
    const depth = normalizeDepth(data);

    const bidsSum = sumQuantity(depth.bids);
    const asksSum = sumQuantity(depth.asks);

    const { min: bidMin, max: bidMax } = priceRange(depth.bids);
    const { min: askMin, max: askMax } = priceRange(depth.asks);

    return {
      bidsSum,
      asksSum,
      bidMin,
      bidMax,
      askMin,
      askMax,
    };
  }, [data]);

  return (
    <ScrollView
      contentContainerStyle={[globalStyles.backgroundWhite, styles.container]}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
    >
      <Header id={id} />

      {isLoading && <LoadingIndicator />}

      {isError && <ErrorIndicator error={error} onRefresh={() => refetch()} />}

      {!isLoading && !isError && stats && (
        <DepthCard stats={stats} timestamp={formatTimestamp(data?.timestamp)} />
      )}
    </ScrollView>
  );
};

export default MarketDetailsScreen;
