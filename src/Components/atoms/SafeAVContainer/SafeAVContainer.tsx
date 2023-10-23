import {FC, PropsWithChildren} from 'react';
import {Platform, SafeAreaView, StatusBar} from 'react-native';

interface ContainerProps extends PropsWithChildren {}

export const SafeAVContainer: FC<ContainerProps> = ({children}) => {
  return (
    <SafeAreaView className={`h-full p-0 bg-white`}>{children}</SafeAreaView>
  );
};
