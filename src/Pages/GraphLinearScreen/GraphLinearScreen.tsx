import {StyleSheet, Text, View} from 'react-native';
import {BodyContainer} from 'Components/atoms/BodyContainer';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {LinearGraph} from './LinearGraph';

type Props = {};

const GraphLinearScreen = (props: Props) => {
  return (
    <>
      <SafeAVContainer>
        <BodyContainer>
          <View className="flex">
            <Text className="text-white text-22font h-[40px] text-center my-10">
              Real Time Graphic
            </Text>
            <LinearGraph />
          </View>
        </BodyContainer>
      </SafeAVContainer>
    </>
  );
};

export default GraphLinearScreen;
