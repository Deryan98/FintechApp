import {FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, View} from 'react-native';

interface HeaderProps {
  center: JSX.Element;
  right?: JSX.Element;
  left?: JSX.Element;
}

export const Header: FC<HeaderProps> = ({center, right, left}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View
      className={`flex flex-row w-full h-[12%] shadow-lg bg-gray-900`}
      style={{paddingTop: top}}>
      <View className="w-[5%] h-full justify-center items-center">{left}</View>
      <View className="w-3/6 h-full justify-center ">{center}</View>
      <View className="w-[43%] h-full justify-center items-center">
        {right}
      </View>
    </View>
  );
};
