import { SortingProvider, useSorting } from "@/context/SortingContext";
import { act, renderHook } from "@testing-library/react-native";
import React from "react";

describe("SortingContext", () => {
  it("provides default values", () => {
    const { result } = renderHook(() => useSorting(), {
      wrapper: ({ children }) => <SortingProvider>{children}</SortingProvider>,
    });

    expect(result.current.sortKey).toBeUndefined();
    expect(result.current.sortDirection).toBeUndefined();
    expect(result.current.filterName).toBe("");
  });

  it("toggles sort key and direction", () => {
    const { result } = renderHook(() => useSorting(), {
      wrapper: ({ children }) => <SortingProvider>{children}</SortingProvider>,
    });

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortDirection).toBe("ascending");

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortDirection).toBe("descending");

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortDirection).toBeUndefined();
  });

  it("changes sort key when different key is selected", () => {
    const { result } = renderHook(() => useSorting(), {
      wrapper: ({ children }) => <SortingProvider>{children}</SortingProvider>,
    });

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortDirection).toBe("ascending");

    act(() => {
      result.current.toggleSort("spread");
    });
    expect(result.current.sortKey).toBe("spread");
    expect(result.current.sortDirection).toBe("ascending");
  });

  it("updates filter name", () => {
    const { result } = renderHook(() => useSorting(), {
      wrapper: ({ children }) => <SortingProvider>{children}</SortingProvider>,
    });

    act(() => {
      result.current.setFilterName("BTC");
    });
    expect(result.current.filterName).toBe("BTC");
  });

  it("resets sort", () => {
    const { result } = renderHook(() => useSorting(), {
      wrapper: ({ children }) => <SortingProvider>{children}</SortingProvider>,
    });

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortDirection).toBe("ascending");

    act(() => {
      result.current.resetSort();
    });
    expect(result.current.sortKey).toBeUndefined();
    expect(result.current.sortDirection).toBeUndefined();
  });

  it("resets all filters", () => {
    const { result } = renderHook(() => useSorting(), {
      wrapper: ({ children }) => <SortingProvider>{children}</SortingProvider>,
    });

    act(() => {
      result.current.toggleSort("name");
      result.current.setFilterName("BTC");
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.sortKey).toBeUndefined();
    expect(result.current.sortDirection).toBeUndefined();
    expect(result.current.filterName).toBe("");
  });

  it("throws error when used outside provider", () => {
    expect(() => {
      renderHook(() => useSorting());
    }).toThrow("useSorting must be used within a SortingProvider");
  });
});
