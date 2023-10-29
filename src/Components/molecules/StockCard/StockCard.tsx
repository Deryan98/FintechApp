import {P} from 'Components/atoms/Text/Text';
import {useStocksStore} from 'Store/StocksStore';
import {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface StockCardProps extends StockRealTime {
  onPress: any;
  onLongPress?: any;
}

export const StockCard: FC<StockCardProps> = ({
  c,
  p = '',
  s,
  t,
  v = '',
  onPress,
  onLongPress = () => {},
}) => {
  const {symbols} = useStocksStore();

  const selectedSymbol = symbols.get(s);

  const formatPercentaje = (Number.parseFloat(v) * 100).toFixed(2);

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      className="w-[47%] h-auto items-center justify-center p-5 bg-gray-500 rounded-lg my-2 mr-5">
      <View className="w-full ">
        <Text className="text-black font-bold text-14font">
          {s}
          {selectedSymbol?.description
            ? `- ${selectedSymbol?.description}`
            : ''}
        </Text>
      </View>
      {p == '' && (
        <Text className={`text-red-800 w-full mt-2 font-bold text-12font`}>
          Waiting ...
        </Text>
      )}
      {p !== '' && (
        <>
          <View className="w-full ">
            <Text className="text-black font-bold text-14font">
              $ {Number(p).toFixed(2)}
            </Text>
          </View>

          <View className="w-full ">
            <Text className="text-black font-bold text-14font">
              {formatPercentaje} %
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
