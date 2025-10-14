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
