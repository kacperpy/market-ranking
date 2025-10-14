import { FlatList, RefreshControl } from "react-native";
import { EnrichedMarket } from "../../api/types";
import { Header } from "./components/Header";
import MarketRow from "./components/MarketRow";

interface MarketListProps {
  data: EnrichedMarket[];
  loading: boolean;
  onRefresh: () => void;
}

export const MarketList = ({ data, loading, onRefresh }: MarketListProps) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.tickerId}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      ListHeaderComponent={<Header />}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => <MarketRow item={item} onPress={() => {}} />}
    />
  );
};
