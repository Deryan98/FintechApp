import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {useLinearGraphStore} from 'Store/LinearGraphStore';
import {PointerLabelComponent} from './PointerLabelComponent';

type Props = {};

export const LinearGraph = (props: Props) => {
  const {historyStocks} = useLinearGraphStore(state => state);

  const dataArray = historyStocks.filter(
    historyStock => historyStock?.transactStocks.length > 0,
  );

  return (
    <View
      style={{
        paddingVertical: 0,
        // paddingLeft: 20,
        backgroundColor: '#1C1C1C',
      }}>
      <LineChart
        areaChart
        data={dataArray[0]?.transactStocks ?? []}
        data2={dataArray[1]?.transactStocks ?? []}
        data3={dataArray[2]?.transactStocks ?? []}
        data4={dataArray[3]?.transactStocks ?? []}
        data5={dataArray[4]?.transactStocks ?? []}
        rotateLabel
        width={Dimensions.get('window').width / 1.2}
        hideDataPoints
        spacing={10}
        color="#00ff83"
        color2="red"
        color3="yellow"
        color4="blue"
        color5="purple"
        thickness={2}
        startFillColor="#00ff83"
        startFillColor2="red"
        startFillColor3="yellow"
        startFillColor4="blue"
        startFillColor5="purple"
        endFillColor="#00ff83"
        endFillColor2="red"
        endFillColor3="yellow"
        endFillColor4="blue"
        endFillColor5="purple"
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={6}
        maxValue={40000}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType="solid"
        rulesColor="gray"
        yAxisTextStyle={{color: 'gray'}}
        xAxisColor="lightgray"
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor: 'lightgray',
          pointerStripWidth: 2,
          pointerColor: 'lightgray',
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,
          pointerLabelComponent: PointerLabelComponent,
        }}
      />
    </View>
  );
};
