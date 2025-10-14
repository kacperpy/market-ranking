import { SortingProvider } from "@/context/SortingContext";
import React from "react";
import MarketListScreen from "../../screens/marketListScreen/MarketListScreen";

export default function MarketListScreenWrapper() {
  return (
    <SortingProvider>
      <MarketListScreen />
    </SortingProvider>
  );
}
