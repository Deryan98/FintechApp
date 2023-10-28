import {ActivityIndicator, Image, View} from 'react-native';

type Props = {};

export const LoadingScreen = (props: Props) => {
  return (
    <View className="w-full h-full items-center justify-center bg-gray-800">
      <Image source={require('../../Assets/Finnhub.png')} />
      <ActivityIndicator size="large" />
    </View>
  );
};
