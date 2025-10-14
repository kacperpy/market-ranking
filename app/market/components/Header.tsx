import { prettyTicker } from "@/utils/utils";
import { Text, View } from "react-native";
import styles from "../styles";

interface HeaderProps {
  id: string;
}

const Header = ({ id }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{prettyTicker(id ?? "")}</Text>
      <Text style={styles.subtitle}>Orderbook depth summary</Text>
    </View>
  );
};

export default Header;
