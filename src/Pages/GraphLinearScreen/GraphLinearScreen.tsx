import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import {BodyContainer} from 'Components/atoms/BodyContainer';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {LinearGraph} from './LinearGraph';
import {useStocksStore} from 'Store/StocksStore';
import {StockListLegend} from './StockListLegend';
import {useState} from 'react';
import {useDebounce} from 'Hooks/useDebounce';

type Props = {};

const GraphLinearScreen = (props: Props) => {
  const {symbols} = useStocksStore(state => state);
  const symbolsArray = Array.from(symbols.values());
  const [maxValue, setMaxValue] = useState<string>('100000');
  const maxValueDeb = useDebounce(maxValue, 1500);

  return (
    <>
      <SafeAVContainer>
        <BodyContainer>
          <ScrollView className="flex">
            <Text className="text-white text-22font h-[40px] text-center mt-5">
              Real Time Graphic
            </Text>
            <View className="w-full  items-center p-2">
              <View className="bg-purple-800 flex flex-row justify-center rounded-2xl w-1/3">
                <Text className="text-white text-16font text-center  pt-3">
                  Limit:
                </Text>
                <TextInput
                  onChangeText={text => setMaxValue(text)}
                  value={maxValue}
                  placeholder="0"
                  keyboardType="numeric"
                  style={{color: 'white'}}
                  inputMode="numeric"
                />
              </View>
            </View>
            <LinearGraph maxValue={maxValueDeb} />
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
