import {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StockCard} from 'Components/molecules/StockCard';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';

interface StockListProps {
  data: StockRealTime[];
}

export const StockList: FC<StockListProps> = ({data}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      numColumns={2}
      scrollEnabled
      className="p-4 "
      keyExtractor={({s}: any) => s}
      ListHeaderComponent={
        <View className="w-full items-center">
          <TouchableOpacity
            className="bg-purple-700 w-1/3 h-[40] justify-center mb-2 rounded-xl"
            onPress={() => navigation.navigate('Alert')}>
            <Text className="text-white font-bold text-center">Add Stock</Text>
          </TouchableOpacity>
        </View>
      }
      renderItem={({index, item}) => {
        return (
          <StockCard
            {...item}
            onPress={() => {
              console.log('navigate');
              console.log(item.s);
              navigation.navigate('GraphCandles', {symbol: item.s});
            }}
          />
        );
      }}
    />
  );
};
