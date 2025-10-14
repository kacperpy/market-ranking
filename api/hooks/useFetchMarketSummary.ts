import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
import { MarketSummaryResponse } from "../types";

const fetchMarketSummary = async (): Promise<MarketSummaryResponse> => {
  const { data } = await apiClient.get<MarketSummaryResponse>("/summary");
  return data;
};

export default function useFetchMarketSummary() {
  const query = useQuery({
    queryKey: ["marketSummary"],
    queryFn: fetchMarketSummary,
    refetchInterval: 30_000,
  });

  return {
    data: query.data ?? null,
    summary: query.data?.summary ?? [],
    timestamp: query.data?.timestamp ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
