import {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StockCard} from 'Components/molecules/StockCard';
import {FlatList, Text, View} from 'react-native';

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
        <View className="bg-red-900 rounded-2xl items-center justify-center h-[40px] mb-5">
          <Text className="text-white text-14font  text-center ">
            Press any stock to see candles graph
          </Text>
        </View>
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
