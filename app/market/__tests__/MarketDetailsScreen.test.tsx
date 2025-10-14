import useFetchMarketDepth from "@/api/hooks/useFetchMarketDepth";
import { fireEvent, render } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import MarketDetailsScreen from "../[id]";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/api/hooks/useFetchMarketDepth");
jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: (props: any) => props.children,
}));

describe("MarketDetailsScreen", () => {
  const mockId = "BTC_USD";
  const mockMarketDepth = {
    timestamp: "2025-10-14T12:00:00Z",
    bids: [
      { price: "50000", quantity: "1.5" },
      { price: "49900", quantity: "2.0" },
    ],
    asks: [
      { price: "50100", quantity: "1.0" },
      { price: "50200", quantity: "3.0" },
    ],
  };

  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: mockId });
    (useFetchMarketDepth as jest.Mock).mockReturnValue({
      data: mockMarketDepth,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  it("displays loading indicator when data is loading", () => {
    (useFetchMarketDepth as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = render(<MarketDetailsScreen />);
    expect(getByText("Loading depth…")).toBeTruthy();
  });

  it("displays error message when fetch fails", () => {
    const mockError = new Error("Failed to fetch");
    (useFetchMarketDepth as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: mockError,
      refetch: jest.fn(),
    });

    const { getByText } = render(<MarketDetailsScreen />);
    expect(getByText("Failed to fetch")).toBeTruthy();
    expect(getByText("Tap to retry")).toBeTruthy();
  });

  it("displays market details when data is loaded", () => {
    const { getByText } = render(<MarketDetailsScreen />);

    expect(getByText("BTC/USD")).toBeTruthy();
    expect(getByText("Orderbook depth summary")).toBeTruthy();

    expect(getByText("Market depth")).toBeTruthy();

    const allBids = getByText("3.5");
    const allAsks = getByText("4");

    expect(allBids).toBeTruthy();
    expect(allAsks).toBeTruthy();

    expect(getByText("Price range (min–max)")).toBeTruthy();
    expect(getByText("49900 – 50000")).toBeTruthy();
    expect(getByText("50100 – 50200")).toBeTruthy();
  });

  it("refreshes data when pull-to-refresh is triggered", () => {
    const mockRefetch = jest.fn();
    (useFetchMarketDepth as jest.Mock).mockReturnValue({
      data: mockMarketDepth,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    const { getByTestId } = render(<MarketDetailsScreen />);
    const scrollView = getByTestId("market-details-scroll-view");
    const onRefresh = scrollView.props.refreshControl.props.onRefresh;

    onRefresh();
    expect(mockRefetch).toHaveBeenCalled();
  });

  it("retries fetch when error retry button is pressed", () => {
    const mockRefetch = jest.fn();
    (useFetchMarketDepth as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch"),
      refetch: mockRefetch,
    });

    const { getByText } = render(<MarketDetailsScreen />);
    const retryButton = getByText("Tap to retry");

    fireEvent.press(retryButton);
    expect(mockRefetch).toHaveBeenCalled();
  });
});
