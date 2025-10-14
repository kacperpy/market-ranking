import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
import { MarketPair } from "../types";

const fetchMarketPairs = async (): Promise<MarketPair[]> => {
  const { data } = await apiClient.get<MarketPair[]>("/pairs");
  return data;
};

export default function useFetchMarketPairs() {
  const query = useQuery({
    queryKey: ["marketPairs"],
    queryFn: fetchMarketPairs,
    refetchInterval: 60_000,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
