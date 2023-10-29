import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {ptData1, ptData2} from './data';

type Props = {};

export const LinearGraph = (props: Props) => {
  const PointerLabelComponent = items => {
    return (
      <View
        style={{
          height: 90,
          width: 100,
          justifyContent: 'center',
          marginTop: -30,
          marginLeft: -40,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            marginBottom: 6,
            textAlign: 'center',
          }}>
          {items[0].date}
        </Text>

        <View
          style={{
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 16,
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
            {'$' + items[0].value + '.0'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        paddingVertical: 0,
        // paddingLeft: 20,
        backgroundColor: '#1C1C1C',
      }}>
      <LineChart
        areaChart
        data={ptData1}
        data2={ptData2}
        rotateLabel
        width={Dimensions.get('window').width / 1.2}
        hideDataPoints
        spacing={10}
        color="#00ff83"
        color2="red"
        thickness={2}
        startFillColor="rgba(20,105,81,0.3)"
        startFillColor2="red"
        endFillColor="rgba(20,85,81,0.01)"
        endFillColor2="red"
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={6}
        maxValue={600}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType="solid"
        rulesColor="gray"
        yAxisTextStyle={{color: 'gray'}}
        yAxisSide="right"
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
