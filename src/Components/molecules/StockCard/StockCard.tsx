import {P} from 'Components/atoms/Text/Text';
import {FC} from 'react';
import {Text, View} from 'react-native';

export const StockCard: FC<StockRealTime> = ({c, p, s, t, v}) => {
  return (
    <View className="w-[47%] h-[100] items-center justify-center p-5 bg-gray-500 rounded-lg my-2 mr-5">
      <View className="w-full ">
        <Text className="text-black font-bold text-14font">{s}</Text>
      </View>
      <View className="w-full ">
        <Text className="text-black font-bold text-14font">{p}</Text>
      </View>

      <View className="w-full ">
        <Text className="text-black font-bold text-14font">{v}</Text>
      </View>
    </View>
  );
};
