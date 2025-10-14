import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#f5f5f5",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 20,
  },
  text: {
    fontWeight: "700",
    fontSize: 14,
    color: "#222",
  },
  left: {
    textAlign: "left",
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  right: {
    textAlign: "right",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "white",
  },
  ticker: { fontSize: 16, fontWeight: "600" },
  sub: { color: "#6b7280", marginTop: 4 },
  rightStats: { flexDirection: "row", alignItems: "center", gap: 8 },
  spread: { fontVariant: ["tabular-nums"], fontSize: 15 },
  dot: { width: 12, height: 12, borderRadius: 6 },
});

export default styles;
