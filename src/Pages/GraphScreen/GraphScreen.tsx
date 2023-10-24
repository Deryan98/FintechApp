import {ActivityIndicator, Text, View, processColor} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BodyContainer} from 'Components/atoms/BodyContainer';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {CandleStickChart} from 'react-native-charts-wrapper';
import {useGraph} from './useGraph';

type Props = {};

export const GraphScreen = (props: Props) => {
  const route = useRoute();
  const symbol = route.params?.symbol;
  const {isLoadig, stockCandles} = useGraph(symbol);

  if (isLoadig)
    return (
      <SafeAVContainer>
        <BodyContainer>
          <ActivityIndicator />
        </BodyContainer>
      </SafeAVContainer>
    );

  return (
    <>
      <SafeAVContainer>
        <BodyContainer>
          <View style={{flex: 2, margin: 20}}>
            <Text className="text-white text-22font h-[40px] text-center mb-10">
              {symbol}
            </Text>
            <CandleStickChart
              style={{flex: 1}}
              data={{
                dataSets: [
                  {
                    values: stockCandles,
                    label: 'Data Set 1',
                    config: {
                      valueTextColor: processColor('#fff'),
                      highlightColor: processColor('#CEB859FF'),
                      textColor: '#fff',
                      shadowColor: processColor('#adbae0'),
                      shadowWidth: 2,
                      shadowColorSameAsCandle: true,
                      increasingColor: processColor('#71BD6A'),
                      increasingPaintStyle: 'FILL',
                      decreasingColor: processColor('#D14B5A'),
                    },
                  },
                ],
              }}
              marker={{
                enabled: false,
                markerColor: processColor('#2c3e50'),
                textColor: processColor('#adbae0'),
              }}
              legend={{
                enabled: false,
                textSize: 14,
                form: 'CIRCLE',
                wordWrapEnabled: true,
              }}
              xAxis={{
                textColor: processColor('#fff'),
                valueFormatter: 'date',
                valueFormatterPattern: 'dd MMM',
              }}
              yAxis={{
                textColor: processColor('#fff'),
              }}
              maxVisibleValueCount={16}
              autoScaleMinMaxEnabled={false}
              chartDescription={{text: ''}}
              zoom={{
                scaleX: 0,
                scaleY: 2,
                xValue: stockCandles.length,
                yValue: 100,
                axisDependency: 'LEFT',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Text>h</Text>
          </View>
        </BodyContainer>
      </SafeAVContainer>
    </>
  );
};
