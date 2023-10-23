import {FC} from 'react';
import {View} from 'react-native';

interface HeaderProps {
  center: JSX.Element;
  right?: JSX.Element;
  left?: JSX.Element;
}

export const Header: FC<HeaderProps> = ({center, right, left}) => {
  return (
    <View className="flex flex-row w-full h-[10%] shadow-lg bg-gray-900">
      <View className="w-1/6 h-full  justify-center items-center">{left}</View>
      <View className="w-3/6 h-full  justify-center ">{center}</View>
      <View className="w-2/6 h-full  justify-center items-center">{right}</View>
    </View>
  );
};
