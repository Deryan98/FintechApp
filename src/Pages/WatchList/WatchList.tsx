import {Button, Text, View} from 'react-native';

import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {StockList} from 'Components/organisms/StockList/StockList';
import {Header} from 'Components/atoms/Header';
import {useNavigation} from '@react-navigation/native';
import {BodyContainer} from 'Components/atoms/BodyContainer/BodyContainer';

type Props = {};

export const WatchList = (props: Props) => {
  // const {socket, unsubscribe} = useWebSocket();
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
          <StockList
            data={[
              {
                c: null,
                p: 29793.91,
                s: 'BINANCE:BTCUSDT',
                t: 1698012636519,
                v: 0.00211,
              },
              {
                c: null,
                p: 29793.92,
                s: 'BINANCE:BTCUSDT',
                t: 1698012636712,
                v: 0.00232,
              },
              {
                c: null,
                p: 29793.91,
                s: 'BINANCE:BTCUSDT',
                t: 1698012636723,
                v: 0.03772,
              },
              {
                c: null,
                p: 29793.92,
                s: 'BINANCE:BTCUSDT',
                t: 1698012636732,
                v: 0.00408,
              },
              {
                c: null,
                p: 29793.91,
                s: 'BINANCE:BTCUSDT',
                t: 1698012637010,
                v: 0.05983,
              },
            ]}
          />
        </BodyContainer>
      </SafeAVContainer>
    </>
  );
};
