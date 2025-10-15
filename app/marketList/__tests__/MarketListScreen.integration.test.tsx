import useFetchMarketPairs from "@/api/hooks/useFetchMarketPairs";
import { SortingProvider } from "@/context/SortingContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import MarketListScreen from "../MarketListScreen";

jest.mock("@/api/hooks/useFetchMarketPairs");

describe("MarketListScreen Integration Test", () => {
  const mockQueryClient = new QueryClient();

  afterEach(() => {
    jest.clearAllMocks();
    mockQueryClient.clear();
    cleanup();
  });

  it("fetches and displays market pairs", async () => {
    const mockPairs = [{ ticker_id: "BTC_USD" }, { ticker_id: "ETH_USD" }];
    (useFetchMarketPairs as jest.Mock).mockReturnValue({
      data: mockPairs,
      isLoading: false,
      isError: false,
    });

    render(
      <QueryClientProvider client={mockQueryClient}>
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
