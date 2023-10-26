import {Button, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {StockList} from 'Components/organisms/StockList/StockList';
import {Header} from 'Components/atoms/Header';
import {BodyContainer} from 'Components/atoms/BodyContainer/BodyContainer';
import {useWebSocket} from 'Hooks/useWebSocket';
import {useStocksStore} from 'Store/Stocks';

type Props = NativeStackScreenProps<MainStackParamList, 'Watchlist'>;

export const WatchList = ({navigation}: Props) => {
  useWebSocket();
  const {watchedStocks} = useStocksStore(state => state);

  const renderEmptyComponent = () => {
    if (watchedStocks.length === 0)
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text className="text-white font-semi text-18font text-center">
            No stocks watched yet!
          </Text>
        </View>
      );
    return null;
  };

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
          {renderEmptyComponent()}

          <StockList data={watchedStocks} />
        </BodyContainer>
      </SafeAVContainer>
    </>
  );
};
