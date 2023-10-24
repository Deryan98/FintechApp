import {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StockCard} from 'Components/molecules/StockCard';
import {FlatList} from 'react-native';

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
      keyExtractor={({t}: any) => t}
      renderItem={({index, item}) => {
        return (
          <StockCard
            {...item}
            onPress={() => {
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
