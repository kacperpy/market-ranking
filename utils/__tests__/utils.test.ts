import {
  calculateSpreadPercentage,
  formatTimestamp,
  normalizeDepth,
  prettyTicker,
  priceRange,
  ragFromSpread,
  sumQuantity,
  toNumber,
} from "../utils";

describe("Utility Functions", () => {
  describe("formatTimestamp", () => {
    it("formats valid ISO string correctly", () => {
      const date = "2025-10-14T12:00:00Z";
      expect(formatTimestamp(date)).toMatch(/Oct 14, 2025/);
    });

    it("returns dash for invalid date", () => {
      expect(formatTimestamp("invalid-date")).toBe("-");
    });

    it("returns dash for undefined input", () => {
      expect(formatTimestamp(undefined)).toBe("-");
    });
  });

  describe("toNumber", () => {
    it("converts string number to number", () => {
      expect(toNumber("123.45")).toBe(123.45);
    });

    it("returns null for invalid number", () => {
      expect(toNumber("invalid")).toBeNull();
    });

    it("returns null for null input", () => {
      expect(toNumber(null)).toBeNull();
    });

    it("returns number for number input", () => {
      expect(toNumber(123.45)).toBe(123.45);
    });
  });

  describe("calculateSpreadPercentage", () => {
    it("calculates spread percentage correctly", () => {
      expect(calculateSpreadPercentage(100, 110)).toBeCloseTo(9.52, 2);
    });

    it("returns null when either input is null", () => {
      expect(calculateSpreadPercentage(null, 110)).toBeNull();
      expect(calculateSpreadPercentage(100, null)).toBeNull();
    });

    it("returns null when average price is zero", () => {
      expect(calculateSpreadPercentage(0, 0)).toBeNull();
    });
  });

  describe("ragFromSpread", () => {
    it("returns Green for spread <= 2%", () => {
      expect(ragFromSpread(1.5)).toBe("Green");
      expect(ragFromSpread(2)).toBe("Green");
    });

    it("returns Amber for spread > 2%", () => {
      expect(ragFromSpread(2.1)).toBe("Amber");
    });

    it("returns Red for null spread", () => {
      expect(ragFromSpread(null)).toBe("Red");
    });
  });

  describe("prettyTicker", () => {
    it("replaces underscores with forward slashes", () => {
      expect(prettyTicker("BTC_USD")).toBe("BTC/USD");
      expect(prettyTicker("ETH_BTC")).toBe("ETH/BTC");
    });

    it("handles multiple underscores", () => {
      expect(prettyTicker("BTC_ETH_USD")).toBe("BTC/ETH/USD");
    });
  });

  describe("normalizeDepth", () => {
    it("normalizes valid market depth data", () => {
      const raw = {
        timestamp: "2025-10-14T12:00:00Z",
        bids: [{ price: "100", quantity: "1.5" }],
        asks: [{ price: "110", quantity: "2.0" }],
      };

      const normalized = normalizeDepth(raw);
      expect(normalized.bids[0]).toEqual({ price: 100, quantity: 1.5 });
      expect(normalized.asks[0]).toEqual({ price: 110, quantity: 2.0 });
    });

    it("filters out invalid entries", () => {
      const raw = {
        timestamp: "2025-10-14T12:00:00Z",
        bids: [
          { price: "invalid", quantity: "1.5" },
          { price: "100", quantity: "1.5" },
        ],
        asks: [],
      };

      const normalized = normalizeDepth(raw);
      expect(normalized.bids).toHaveLength(1);
      expect(normalized.bids[0]).toEqual({ price: 100, quantity: 1.5 });
    });

    it("handles empty arrays", () => {
      const raw = {
        timestamp: "2025-10-14T12:00:00Z",
        bids: [],
        asks: [],
      };

      const normalized = normalizeDepth(raw);
      expect(normalized.bids).toHaveLength(0);
      expect(normalized.asks).toHaveLength(0);
    });
  });

  describe("sumQuantity", () => {
    it("sums quantities correctly", () => {
      const entries = [
        { price: 100, quantity: 1.5 },
        { price: 101, quantity: 2.5 },
      ];
      expect(sumQuantity(entries)).toBe(4);
    });

    it("returns 0 for empty array", () => {
      expect(sumQuantity([])).toBe(0);
    });
  });

  describe("priceRange", () => {
    it("returns min and max prices from entries", () => {
      const entries = [
        { price: 100, quantity: 1 },
        { price: 90, quantity: 1 },
        { price: 110, quantity: 1 },
      ];

      const range = priceRange(entries);
      expect(range).toEqual({ min: 90, max: 110 });
    });

    it("returns null values for empty array", () => {
      const range = priceRange([]);
      expect(range).toEqual({ min: null, max: null });
    });

    it("returns same min and max for single entry", () => {
      const entries = [{ price: 100, quantity: 1 }];
      const range = priceRange(entries);
      expect(range).toEqual({ min: 100, max: 100 });
    });
  });
});
