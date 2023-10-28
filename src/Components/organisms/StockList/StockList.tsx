import {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StockCard} from 'Components/molecules/StockCard';
import {FlatList, Text, TouchableOpacity} from 'react-native';

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
        <TouchableOpacity
          className="bg-purple-800 w-full h-[50] justify-center mb-2 rounded-lg"
          onPress={() => navigation.navigate('Alert')}>
          <Text className="text-white font-bold text-center">Add Alert</Text>
        </TouchableOpacity>
      }
      renderItem={({index, item}) => {
        return (
          <StockCard
            {...item}
            onPress={() => {
              console.log('navigate');
              console.log(item.s);
              navigation.navigate('Graph', {
                symbol: item.s,
              });
            }}
          />
        );
      }}
    />
  );
};
