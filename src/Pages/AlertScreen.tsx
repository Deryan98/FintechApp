import {Text, View} from 'react-native';

type Props = {};

const HelloWorld = (props: Props) => {
  return (
    <View className="flex-1 items-center justify-center bg-red-600">
      <Text>AlertScreen</Text>
    </View>
  );
};

export default HelloWorld;
