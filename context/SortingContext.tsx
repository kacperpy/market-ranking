import React, { createContext, ReactNode, useContext, useState } from "react";

type SortKey = "name" | "spread" | undefined;
type SortDirection = "ascending" | "descending";

interface SortingContextValue {
  sortKey: SortKey;
  sortDirection: SortDirection;
  toggleSort: (key: SortKey) => void;
}

const SortingContext = createContext<SortingContextValue | null>(null);

export const SortingProvider = ({ children }: { children: ReactNode }) => {
  const [sortKey, setSortKey] = useState<SortKey>(undefined);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("ascending");

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) =>
        prev === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortKey(key);
      setSortDirection("ascending");
    }
  };

  return (
    <SortingContext.Provider value={{ sortKey, sortDirection, toggleSort }}>
      {children}
    </SortingContext.Provider>
  );
};

export const useSorting = () => {
  const context = useContext(SortingContext);
  if (!context) {
    throw new Error("useSorting must be used within a SortingProvider");
  }
  return context;
};
