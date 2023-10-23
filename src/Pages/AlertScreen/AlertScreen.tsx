import {BodyContainer} from 'Components/atoms/BodyContainer';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAlertScreen} from './useAlertScreen';

type Props = {};

export const AlertScreen = (props: Props) => {
  const {stockSymbols, setStockSymbols, isLoadig} = useAlertScreen();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [targetPrice, onChangeTargetPrice] = useState<string>('');

  if (isLoadig)
    return (
      <SafeAVContainer>
        <BodyContainer>
          <View className="flex items-center justify-center">
            <ActivityIndicator />
          </View>
        </BodyContainer>
      </SafeAVContainer>
    );

  return (
    <SafeAVContainer>
      <BodyContainer>
        <View className="flex h-full items-center  p-5  ">
          <View className="mb-5">
            <Text className="text-white text-22font h-[40px] text-center">
              Stock to Watch
            </Text>
            <Text className="text-white text-14font h-[40px] text-center">
              You can select your desired stock to be watched for tracking it on
              real time
            </Text>
          </View>

          <View className="mb-5">
            <Text className="text-white text-18font h-[35px]">Stock</Text>
            <DropDownPicker
              style={{height: 50, backgroundColor: '#a0aec0'}}
              open={open}
              value={value}
              items={stockSymbols}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setStockSymbols}
              searchable
            />
          </View>
          <View className="w-full mb-20">
            <Text className="text-white text-18font h-[35px]">
              Target Price
            </Text>
            <TextInput
              className="h-[50px] w-full bg-gray-500 rounded-md px-[10]"
              // style={{alignItems: 'center', paddingHorizontal: 10}}
              value={targetPrice}
              onChangeText={onChangeTargetPrice}
              placeholder="Price Alert"
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity className="w-full bg-purple-700 rounded-md h-[50px] items-center justify-center ">
            <Text className="text-white text-18font ">Add Stock</Text>
          </TouchableOpacity>
        </View>
      </BodyContainer>
    </SafeAVContainer>
  );
};
