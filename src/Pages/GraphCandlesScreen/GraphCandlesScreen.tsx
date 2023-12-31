import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityIndicator, Text, View, processColor} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BodyContainer} from 'Components/atoms/BodyContainer';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {CandleStickChart} from 'react-native-charts-wrapper';
import {useGraphCandles} from './useGraphCandles';

type Props = NativeStackScreenProps<MainStackParamList, 'Graph'>;

export const GraphCandlesScreen = ({route: {params}}: Props) => {
  const symbol = params?.symbol;
  const {isLoadig, stockCandles, rawData} = useGraphCandles(symbol);

  if (isLoadig)
    return (
      <SafeAVContainer>
        <BodyContainer>
          <ActivityIndicator />
        </BodyContainer>
      </SafeAVContainer>
    );

  if (rawData.s === 'no_data')
    return (
      <SafeAVContainer>
        <BodyContainer>
          <View style={{flex: 2, margin: 20}}>
            <Text className="text-white text-22font h-[40px] text-center mb-10">
              No data found
            </Text>
          </View>
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
                valueFormatterPattern: 'dd MMM YYYY',
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
        </BodyContainer>
      </SafeAVContainer>
    </>
  );
};
