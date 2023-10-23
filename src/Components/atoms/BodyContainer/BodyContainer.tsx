import {PropsWithChildren} from 'react';
import {View} from 'react-native';

export const BodyContainer = ({children}: PropsWithChildren) => {
  return <View className="h-full bg-gray-800">{children}</View>;
};
