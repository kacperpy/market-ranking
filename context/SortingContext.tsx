import React, { createContext, ReactNode, useContext, useState } from "react";

type SortKey = "name" | "spread" | undefined;
type SortDirection = "ascending" | "descending" | undefined;

interface SortingContextValue {
  sortKey: SortKey;
  sortDirection: SortDirection;
  filterName: string;
  toggleSort: (key: SortKey) => void;
  setFilterName: (name: string) => void;
  resetSort: () => void;
  resetFilters: () => void;
}

const SortingContext = createContext<SortingContextValue | null>(null);

export const SortingProvider = ({ children }: { children: ReactNode }) => {
  const [sortKey, setSortKey] = useState<SortKey>(undefined);
  const [sortDirection, setSortDirection] = useState<SortDirection>(undefined);
  const [filterName, setFilterName] = useState<string>("");

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => {
        if (prev === "ascending") return "descending";
        if (prev === "descending") return undefined;
        return "ascending";
      });
    } else {
      setSortKey(key);
      setSortDirection("ascending");
    }
  };

  const resetSort = () => {
    setSortKey(undefined);
    setSortDirection(undefined);
  };

  const resetFilters = () => {
    setFilterName("");
    resetSort();
  };

  return (
    <SortingContext.Provider
      value={{
        sortKey,
        sortDirection,
        filterName,
        toggleSort,
        setFilterName,
        resetSort,
        resetFilters,
      }}
    >
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
