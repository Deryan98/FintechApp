import {View, ScrollView, Text, Platform} from 'react-native';
import StockLegend from './StockLegend';

type Symbol = {
  symbol: string;
  targetPrice: string;
  notified?: boolean;
};

type Props = {
  data: Symbol[];
  headerLegend: string;
  mt?: string;
  bg?: string;
};

export const StockListLegend = ({
  data,
  headerLegend,
  mt = '14',
  bg = '',
}: Props) => {
  const gridSize = data.length.toString();
  return (
    <View
      className={`mt-${mt} items-center`}
      style={{marginTop: Platform.OS === 'ios' ? 80 : 60}}>
      <View className={`bg-${bg} w-[90%] py-1 rounded-3xl`}>
        <Text className="text-white font-semi text-16font text-center">
          {headerLegend}
        </Text>
      </View>
      <ScrollView horizontal className=" flex flex-row py-4 w-full h-auto ">
        {data.map(({symbol}, index) => (
          <StockLegend key={symbol} legend={symbol} gridSize={gridSize} />
        ))}
      </ScrollView>
    </View>
  );
};
