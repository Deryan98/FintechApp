import {BodyContainer} from 'Components/atoms/BodyContainer';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAlertScreen} from './useAlertScreen';
import {useStocksStore} from 'Store/StocksStore';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<MainStackParamList, 'Alert'>;

export const AlertScreen = (props: Props) => {
  const {stockSymbols, setStockSymbols, isLoadig} = useAlertScreen();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [targetPrice, onChangeTargetPrice] = useState<string>('');
  const {symbols, setSymbol, setWatchedStock} = useStocksStore(state => state);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation();
  const [isShownModal, setIsShownModal] = useState<boolean>(false);

  const validateForm: () => boolean = () => {
    const parsedTargetPrice = Number.parseFloat(targetPrice);
    setError('');
    if (value === '' || targetPrice === '' || parsedTargetPrice === 0) {
      setError(
        'There are some errors in the form, please validate them before submitting ',
      );
      return false;
    } else if (symbols.get(value)) {
      setError('The chosen symbol already exists on the watched stocks ');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) return;
    if (symbols.size === 0) setWatchedStock({s: 'BINANCE:BTCUSDT'});
    setSymbol({symbol: value!, targetPrice});
    setWatchedStock({s: value});
    navigation.goBack();
  };

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
              onOpen={() => setIsShownModal(true)}
              onClose={() => setIsShownModal(false)}
              open={open}
              value={value}
              items={stockSymbols}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setStockSymbols}
              searchable
            />
          </View>
          {!isShownModal && (
            <>
              <View className="w-full mb-10">
                <Text className="text-white text-18font h-[35px]">
                  Target Price
                </Text>
                <TextInput
                  className="h-[50px] w-full bg-gray-500 rounded-md px-[10] -z-10"
                  // style={{alignItems: 'center', paddingHorizontal: 10}}
                  value={targetPrice}
                  onChangeText={onChangeTargetPrice}
                  placeholder="Price Alert"
                  keyboardType="numeric"
                />
              </View>
              <View className="mb-10">
                {error.length > 0 && (
                  <Text className="text-red-500 font-bold text-14font">
                    Error: {error}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                className="w-full bg-purple-700 rounded-md h-[50px] items-center justify-center ">
                <Text className="text-white text-18font ">Add Stock</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </BodyContainer>
    </SafeAVContainer>
  );
};
