import { MarketDepth, MarketDepthItem, MarketDepthResponse } from "./api/types";

export const formatTimestamp = (isoString?: string): string => {
  if (!isoString) return "-";

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

export const toNumber = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;

  const number = typeof value === "number" ? value : parseFloat(String(value));
  return isNaN(number) ? null : number;
};

export const calculateSpreadPercentage = (
  highestBid: number | null,
  lowestAsk: number | null
): number | null => {
  if (highestBid === null || lowestAsk === null) return null;

  const averagePrice = (highestBid + lowestAsk) / 2;

  if (averagePrice === 0) return null;

  const spreadPercent = ((lowestAsk - highestBid) / averagePrice) * 100;

  return Number.isFinite(spreadPercent) ? spreadPercent : null;
};

export const ragFromSpread = (
  spreadPct: number | null
): "Green" | "Amber" | "Red" => {
  if (spreadPct === null) return "Red";
  return spreadPct <= 2 ? "Green" : "Amber";
};

export const prettyTicker = (id: string) => id.replace(/_/g, "/");

export const normalizeDepth = (raw: MarketDepthResponse): MarketDepth => {
  const convertSide = (
    orders: { price: string; quantity: string }[]
  ): MarketDepthItem[] => {
    if (!orders) return [];

    return orders
      .map((order) => {
        const price = toNumber(order.price);
        const quantity = toNumber(order.quantity);

        if (price === null || quantity === null) return null;

        return { price, quantity };
      })
      .filter((order): order is MarketDepthItem => order !== null);
  };

  return {
    bids: convertSide(raw.bids),
    asks: convertSide(raw.asks),
  };
};

export const sumQuantity = (entries: MarketDepthItem[]): number => {
  return entries.reduce((total, entry) => {
    const quantity = entry.quantity;

    if (Number.isFinite(quantity)) {
      return total + quantity;
    }

    return total;
  }, 0);
};

export const priceRange = (
  entries: MarketDepthItem[]
): { min: number | null; max: number | null } => {
  if (entries.length === 0) {
    return { min: null, max: null };
  }

  let lowestPrice = entries[0].price;
  let highestPrice = entries[0].price;

  for (const { price } of entries) {
    if (price < lowestPrice) {
      lowestPrice = price;
    }
    if (price > highestPrice) {
      highestPrice = price;
    }
  }

  return { min: lowestPrice, max: highestPrice };
};
