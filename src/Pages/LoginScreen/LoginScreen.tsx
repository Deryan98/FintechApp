import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth0} from 'react-native-auth0';

type Props = NativeStackScreenProps<MainStackParamList, 'Login'>;

export const LoginScreen = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {authorize, clearSession, user, error, isLoading} = useAuth0();

  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return (
      <View className="flex items-center justify-center">
        <Text>Loading</Text>
      </View>
    );
  }

  const loggedIn = user !== undefined && user !== null;

  return (
    <View className="h-full justify-center items-center bg-gray-800">
      <Text className="text-white  h-[15%] font-bold text-26font">Login</Text>
      <Text className="text-white">
        {loggedIn
          ? `You are logged in as ${user.name}`
          : 'You are not logged in'}
      </Text>
      {error && <Text className="text-red-500">{error.message}</Text>}
      <TouchableOpacity
        className="bg-purple-500 w-[90%] p-5 m-5 rounded-lg"
        onPress={onLogin}>
        <Text className="text-white text-center">
          Log {loggedIn ? 'Out' : 'In'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-500 w-[90%] p-5 rounded-lg"
        onPress={onLogout}>
        <Text className="text-white text-center">Clear Sesion</Text>
      </TouchableOpacity>
    </View>
  );
};
