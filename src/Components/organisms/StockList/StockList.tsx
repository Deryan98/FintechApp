import {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StockCard} from 'Components/molecules/StockCard';
import {FlatList, Text, View, TouchableOpacity, Alert} from 'react-native';
import {useStocksStore} from 'Store/Stocks';
import {useLinearGraphStore} from 'Store/LinearGraph';

interface StockListProps {
  data: StockRealTime[];
}

export const StockList: FC<StockListProps> = ({data}) => {
  const navigation = useNavigation();

  const {removeStock} = useStocksStore(state => state);
  const {removeHistStock} = useLinearGraphStore(state => state);

  const handleOnLongPress = (symbol: string) => {
    Alert.alert('Delete a stock', `Do you want to remove ${symbol} stock?`, [
      {
        text: 'Confirm',
        onPress: () => {
          removeStock(symbol);
          removeHistStock(symbol);
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

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
            onLongPress={() => handleOnLongPress(item.s)}
          />
        );
      }}
    />
  );
};
