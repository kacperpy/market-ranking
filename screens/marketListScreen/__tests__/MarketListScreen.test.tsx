import useFetchMarketPairs from "@/api/hooks/useFetchMarketPairs";
import useFetchMarketSummary from "@/api/hooks/useFetchMarketSummary";
import { SortingProvider } from "@/context/SortingContext";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import MarketListScreen from "../MarketListScreen";

jest.mock("@/api/hooks/useFetchMarketPairs");
jest.mock("@/api/hooks/useFetchMarketSummary");
jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: (props: any) => props.children,
}));
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("MarketListScreen", () => {
  const mockPairs = [{ ticker_id: "BTC_USD" }, { ticker_id: "ETH_USD" }];

  const mockSummary = [
    {
      trading_pairs: "BTC-USD",
      highest_bid: "50000",
      lowest_ask: "50100",
    },
    {
      trading_pairs: "ETH-USD",
      highest_bid: "3000",
      lowest_ask: "3010",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchMarketPairs as jest.Mock).mockReturnValue({
      data: mockPairs,
      isLoading: false,
      refetch: jest.fn(),
    });

    (useFetchMarketSummary as jest.Mock).mockReturnValue({
      summary: mockSummary,
      isLoading: false,
      refetch: jest.fn(),
    });
  });

  it("shows loading state", () => {
    (useFetchMarketPairs as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      refetch: jest.fn(),
    });

    (useFetchMarketSummary as jest.Mock).mockReturnValue({
      summary: [],
      isLoading: true,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(
      <SortingProvider>
        <MarketListScreen />
      </SortingProvider>
    );

    const flatList = getByTestId("market-list");
    expect(flatList.props.refreshControl.props.refreshing).toBe(true);
  });

  it("renders market list with correct data when loaded", async () => {
    const { findByText } = render(
      <SortingProvider>
        <MarketListScreen />
      </SortingProvider>
    );

    const btcMarket = await findByText("BTC/USD");
    const ethMarket = await findByText("ETH/USD");

    expect(btcMarket).toBeTruthy();
    expect(ethMarket).toBeTruthy();
  });

  it("filters market list based on search input", async () => {
    const { getByPlaceholderText, findByText, queryByText } = render(
      <SortingProvider>
        <MarketListScreen />
      </SortingProvider>
    );

    await findByText("BTC/USD");

    const searchInput = getByPlaceholderText("DOGE/USDT");
    fireEvent.changeText(searchInput, "BTC");

    await waitFor(() => {
      expect(queryByText("BTC/USD")).toBeTruthy();
      expect(queryByText("ETH/USD")).toBeFalsy();
    });
  });

  it("sorts market list by name", async () => {
    const { getByText, findAllByText } = render(
      <SortingProvider>
        <MarketListScreen />
      </SortingProvider>
    );

    await findAllByText(/BTC\/USD|ETH\/USD/);

    const sortButton = getByText("Market");
    fireEvent.press(sortButton);

    const marketItems = await findAllByText(/BTC\/USD|ETH\/USD/);

    expect(marketItems[0]).toHaveTextContent("BTC/USD");
    expect(marketItems[1]).toHaveTextContent("ETH/USD");
  });

  it("refreshes data when pull-to-refresh is triggered", async () => {
    const mockPairsRefetch = jest.fn();
    const mockSummaryRefetch = jest.fn();

    (useFetchMarketPairs as jest.Mock).mockReturnValue({
      data: mockPairs,
      isLoading: false,
      refetch: mockPairsRefetch,
    });

    (useFetchMarketSummary as jest.Mock).mockReturnValue({
      summary: mockSummary,
      isLoading: false,
      refetch: mockSummaryRefetch,
    });

    const { getByTestId } = render(
      <SortingProvider>
        <MarketListScreen />
      </SortingProvider>
    );

    const flatList = getByTestId("market-list");
    const onRefresh = flatList.props.refreshControl.props.onRefresh;
    onRefresh();

    expect(mockPairsRefetch).toHaveBeenCalled();
    expect(mockSummaryRefetch).toHaveBeenCalled();
  });
});
