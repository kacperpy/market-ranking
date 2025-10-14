import { useRouter } from "expo-router";
import { FlatList, RefreshControl } from "react-native";
import { EnrichedMarket } from "../../../api/types";
import { Header } from "./Header";
import MarketRow from "./MarketRow";

interface MarketListProps {
  data: EnrichedMarket[];
  loading: boolean;
  onRefresh: () => void;
}

export const MarketList = ({ data, loading, onRefresh }: MarketListProps) => {
  const router = useRouter();

  return (
    <FlatList
      testID="market-list"
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.tickerId}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      ListHeaderComponent={<Header />}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => (
        <MarketRow
          item={item}
          onPress={() =>
            router.push({
              pathname: "/market/[id]",
              params: { id: item.tickerId },
            })
          }
        />
      )}
    />
  );
};
