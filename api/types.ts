export type MarketPair = {
  ticker_id: string;
  base: string;
  target: string;
};

export type MarketSummaryItem = {
  trading_pairs: string;
  lowest_price_24h: string;
  highest_price_24h: string;
  highest_bid: string | null;
  lowest_ask: string | null;
  base_volume: string;
  quote_volume: string;
  last_price: string;
  price_change_percent_24h: string;
};

export type MarketSummaryResponse = {
  timestamp: string;
  summary: MarketSummaryItem[];
};
