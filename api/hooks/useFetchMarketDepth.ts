import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
import { MarketDepthResponse } from "../types";

const fetchMarketDepth = async (
  marketId: string
): Promise<MarketDepthResponse> => {
  const { data } = await apiClient.get<MarketDepthResponse>(
    `/depth/${marketId}`
  );
  return data;
};

export default function useFetchMarketDepth(marketId?: string) {
  const query = useQuery({
    queryKey: ["marketDepth", marketId],
    queryFn: () => fetchMarketDepth(marketId as string),
    enabled: !!marketId,
    refetchInterval: 60_000,
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
