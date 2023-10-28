import {Button, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {StockList} from 'Components/organisms/StockList/StockList';
import {Header} from 'Components/atoms/Header';
import {BodyContainer} from 'Components/atoms/BodyContainer/BodyContainer';
import {useWebSocket} from 'Hooks/useWebSocket';
import {useWatchlist} from './useWatchlist';

type Props = NativeStackScreenProps<MainStackParamList, 'Watchlist'>;

export const WatchListScreen = ({navigation}: Props) => {
  useWebSocket();

  const {watchedStocks, loggedIn, onLogout, user} = useWatchlist();

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
          <>
            <Text className="text-white font-bold text-24font">Watch List</Text>
            <Text className="text-blue-300 font-bold text-12font">
              {' '}
              {loggedIn ? `Hello ${user?.name}` : 'No session active'}
            </Text>
          </>
        }
        right={
          <TouchableOpacity
            className="bg-red-800 w-[70%] p-2 rounded-lg"
            onPress={onLogout}>
            <Text className="text-white text-center">Log Out</Text>
          </TouchableOpacity>
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