import { SortingProvider } from "@/context/SortingContext";
import React from "react";
import MarketListScreen from "../marketList/MarketListScreen";

export default function MarketListScreenWrapper() {
  return (
    <SortingProvider>
      <MarketListScreen />
    </SortingProvider>
  );
}
