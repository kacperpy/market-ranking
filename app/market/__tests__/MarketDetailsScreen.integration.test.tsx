import useFetchMarketDepth from "@/api/hooks/useFetchMarketDepth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";
import MarketDetailsScreen from "../[id]";

jest.mock("@/api/hooks/useFetchMarketDepth");
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

const queryClient = new QueryClient();

describe("MarketDetailsScreen Integration Test", () => {
  it("fetches and displays market depth data", async () => {
    const mockId = "BTC_USD";
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: mockId });
    const mockDepthData = {
      bids: [
        { price: "50000", quantity: "0.1" },
        { price: "49000", quantity: "0.2" },
      ],
      asks: [
        { price: "51000", quantity: "0.1" },
        { price: "52000", quantity: "0.2" },
      ],
    };
    (useFetchMarketDepth as jest.Mock).mockReturnValue({
      data: mockDepthData,
      loading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MarketDetailsScreen />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("BTC/USD")).toBeTruthy();
    });
  });
});
