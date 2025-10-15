import { queryClient } from "@/api/client";
import useFetchMarketPairs from "@/api/hooks/useFetchMarketPairs";
import { SortingProvider } from "@/context/SortingContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react-native";
import MarketListScreen from "../MarketListScreen";

jest.mock("@/api/hooks/useFetchMarketPairs");

describe("MarketListScreen Integration Test", () => {
  it("fetches and displays market pairs", async () => {
    const mockPairs = [{ ticker_id: "BTC_USD" }, { ticker_id: "ETH_USD" }];
    (useFetchMarketPairs as jest.Mock).mockReturnValue({
      data: mockPairs,
      loading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <SortingProvider>
          <MarketListScreen />
        </SortingProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("BTC/USD")).toBeTruthy();
      expect(screen.getByText("ETH/USD")).toBeTruthy();
    });
  });
});
