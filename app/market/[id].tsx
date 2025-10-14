import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MarketDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>{id}</Text>
    </SafeAreaView>
  );
};

export default MarketDetailsScreen;
