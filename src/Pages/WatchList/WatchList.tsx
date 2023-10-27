import {Button, StatusBar, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {StockList} from 'Components/organisms/StockList/StockList';
import {Header} from 'Components/atoms/Header';
import {BodyContainer} from 'Components/atoms/BodyContainer/BodyContainer';
import {useWebSocket} from 'Hooks/useWebSocket';
import {useStocksStore} from 'Store/Stocks';
import {usePushNotifications} from 'Hooks/usePushNotifications';

type Props = NativeStackScreenProps<MainStackParamList, 'Watchlist'>;

export const WatchList = ({navigation}: Props) => {
  useWebSocket();
  const {pushNotification} = usePushNotifications();
  const {watchedStocks} = useStocksStore(state => state);

  const renderEmptyComponent = () => {
    if (watchedStocks.size === 0)
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
      <StatusBar barStyle="light-content" />
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

          <StockList data={Array.from(watchedStocks.values())} />
        </BodyContainer>
      </SafeAVContainer>
    </>
  );
};
