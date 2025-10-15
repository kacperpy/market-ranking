import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";
import MarketRow from "../components/MarketRow";

describe("MarketRow", () => {
  const mockOnPress = jest.fn();
  const defaultProps = {
    item: {
      tickerId: "BTC_USD",
      highestBid: 50000,
      lowestAsk: 50100,
      spreadPct: 0.2,
      rag: "Green" as const,
    },
    onPress: mockOnPress,
  };

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it("renders market ticker correctly", () => {
    const { getByText } = render(<MarketRow {...defaultProps} />);
    expect(getByText("BTC/USD")).toBeTruthy();
  });

  it("displays bid and ask prices", () => {
    const { getByText } = render(<MarketRow {...defaultProps} />);
    expect(getByText("BID: 50000 | ASK: 50100")).toBeTruthy();
  });

  it("shows dash for null bid/ask values", () => {
    const props = {
      item: {
        ...defaultProps.item,
        highestBid: null,
        lowestAsk: null,
      },
      onPress: mockOnPress,
    };

    const { getByText } = render(<MarketRow {...props} />);
    expect(getByText("BID: - | ASK: -")).toBeTruthy();
  });

  it("displays spread percentage with correct formatting", () => {
    const { getByText } = render(<MarketRow {...defaultProps} />);
    expect(getByText("0.20%")).toBeTruthy();
  });

  it("shows dash for null spread", () => {
    const props = {
      item: {
        ...defaultProps.item,
        spreadPct: null,
      },
      onPress: mockOnPress,
    };

    const { getByText } = render(<MarketRow {...props} />);
    expect(getByText("-")).toBeTruthy();
  });

  it("triggers onPress when pressed", () => {
    const { getByText } = render(<MarketRow {...defaultProps} />);
    fireEvent.press(getByText("BTC/USD"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("applies correct RAG color indicator", () => {
    const ragStatusTests = [
      { rag: "Green", color: "#16a34a" },
      { rag: "Amber", color: "#f59e0b" },
      { rag: "Red", color: "#ef4444" },
    ] as const;

    ragStatusTests.forEach(({ rag, color }) => {
      const props = {
        item: {
          ...defaultProps.item,
          rag,
        },
        onPress: mockOnPress,
      };

      const { UNSAFE_getAllByType } = render(<MarketRow {...props} />);
      const views = UNSAFE_getAllByType(View);
      const dotElement = views.find((view) => {
        const style = view.props.style;
        return (
          Array.isArray(style) &&
          style.length === 2 &&
          style[1].backgroundColor === color
        );
      });
      expect(dotElement).toBeTruthy();
    });
  });
});
