import { StyleSheet } from "react-native";

const TEXT_PRIMARY = "black";
const TEXT_MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const CARD_BG = "#FFFFFF";

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 12 },
  title: { fontSize: 22, fontWeight: "800", color: TEXT_PRIMARY },
  subtitle: { color: TEXT_MUTED, marginTop: 4 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  muted: {
    color: "#9ca3af",
    fontSize: 14,
    textAlign: "center",
  },
  errorText: { color: "#ef4444", textAlign: "center" },
  link: { color: TEXT_PRIMARY, marginTop: 8, fontWeight: "700" },
  card: {
    backgroundColor: CARD_BG,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: { fontWeight: "800", marginBottom: 8, color: TEXT_PRIMARY },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  label: { color: TEXT_PRIMARY, opacity: 0.9 },
  value: {
    fontWeight: "700",
    color: TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 12,
  },
  timestamp: { color: TEXT_MUTED, fontSize: 12, textAlign: "right" },
});

export default styles;
