import {StockCard} from 'Components/molecules/StockCard';
import React, {FC} from 'react';
import {FlatList, View} from 'react-native';

interface StockListProps {
  data: StockRealTime[];
}

export const StockList: FC<StockListProps> = ({data}) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      scrollEnabled
      className="p-4 "
      keyExtractor={({t}: any) => t}
      renderItem={({index, item}) => {
        return <StockCard {...item} />;
      }}
    />
  );
};
