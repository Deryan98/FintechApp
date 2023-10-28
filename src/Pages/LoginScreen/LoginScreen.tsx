import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth0} from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from 'Store/Auth';

type Props = NativeStackScreenProps<MainStackParamList, 'Login'>;

export const LoginScreen = ({navigation}: Props) => {
  const {authorize, clearSession, user, error, isLoading} = useAuth0();
  const {setAuthStatus} = useAuthStore(state => state);

  const onLogin = async () => {
    setAuthStatus('checking');
    try {
      const response = await authorize();
      if (response) {
        await AsyncStorage.setItem('@token', response.idToken);
        setAuthStatus('auth');
      } else setAuthStatus('not-auth');
    } catch (e) {
      setAuthStatus('not-auth');
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
