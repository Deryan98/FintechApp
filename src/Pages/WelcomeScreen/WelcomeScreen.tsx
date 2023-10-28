import {View, Text, TouchableOpacity, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth0} from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from 'Store/Auth';
import {useWelcome} from './useWelcome';

type Props = NativeStackScreenProps<MainStackParamList, 'WelcomeScreen'>;

export const WelcomeScreen = (props: Props) => {
  const {error, onLogin} = useWelcome();

  return (
    <View className="h-full justify-center items-center bg-gray-800">
      <Image source={require('../../Assets/Finnhub.png')} />
      <Text className="text-white">Welcome to </Text>
      <Text className="text-white  h-[10%] font-bold text-26font">
        Finnhub App
      </Text>

      {error && <Text className="text-red-500">{error.message}</Text>}
      <TouchableOpacity
        className="bg-purple-500 w-[90%] p-5 m-5 rounded-lg"
        onPress={onLogin}>
        <Text className="text-white font-bold text-center ">
          Let's Authenticate
        </Text>
      </TouchableOpacity>
    </View>
  );
};
