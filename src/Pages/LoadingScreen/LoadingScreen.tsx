import React from 'react';
import {ActivityIndicator, View} from 'react-native';

type Props = {};

export const LoadingScreen = (props: Props) => {
  return (
    <View className="w-full h-full items-center justify-center">
      <ActivityIndicator size="large" className="bg-blue-500" />
    </View>
  );
};
