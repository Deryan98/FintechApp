import {Button, Text, View} from 'react-native';

import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {StockList} from 'Components/organisms/StockList/StockList';
import {Header} from 'Components/atoms/Header';
import {useNavigation} from '@react-navigation/native';
import {BodyContainer} from 'Components/atoms/BodyContainer/BodyContainer';
import {useWebSocket} from 'Hooks/useWebSocket';
import {useStocksStore} from 'Store/Stocks';

type Props = {};

export const WatchList = (props: Props) => {
  useWebSocket();
  const {watchedStocks} = useStocksStore(state => state);
  const navigation = useNavigation();

  return (
    <>
      <Header
        center={
          <Text className="text-white font-bold text-24font">Watch List</Text>
        }
        right={
          <Button
            title="Add Alert"
            onPress={() => navigation.navigate('Alert')}
          />
        }
      />
      <SafeAVContainer>
        <BodyContainer>
          <StockList data={watchedStocks} />
        </BodyContainer>
      </SafeAVContainer>
    </>
  );
};
