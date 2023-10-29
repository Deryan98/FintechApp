import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {BodyContainer} from 'Components/atoms/BodyContainer';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {LinearGraph} from './LinearGraph';
import {useStocksStore} from 'Store/Stocks';
import {StockListLegend} from './StockListLegend';

type Props = {};

const GraphLinearScreen = (props: Props) => {
  const {symbols} = useStocksStore(state => state);
  const symbolsArray = Array.from(symbols.values());

  return (
    <>
      <SafeAVContainer>
        <BodyContainer>
          <ScrollView className="flex">
            <Text className="text-white text-22font h-[40px] text-center my-5">
              Real Time Graphic
            </Text>
            <LinearGraph />
            <StockListLegend
              headerLegend="Select a list of 5 stocks to see in graph"
              data={symbolsArray}
              bg="gray-900"
            />
          </ScrollView>
        </BodyContainer>
      </SafeAVContainer>
    </>
  );
};

export default GraphLinearScreen;
