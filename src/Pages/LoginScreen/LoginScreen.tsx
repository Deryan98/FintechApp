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
    <View className="flex justify-center items-center bg-gray-800">
      <Text>Login Screen</Text>
      {loggedIn && <Text>You are logged in as {user.name}</Text>}
      {!loggedIn && <Text>You are not logged in</Text>}
      {error && <Text className="text-red-500">{error.message}</Text>}
      <TextInput
        className="w-[80%] h-[40] bg-gray-500 m-5, p-5 rounded-sm"
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        className="w-[80%] h-[40] bg-gray-500 m-5, p-5 rounded-sm"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        className="bg-purple-500 p-5 m-5 rounded-sm"
        onPress={onLogin}>
        <Text className="text-white text-center">
          Log {loggedIn ? 'Out' : 'In'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-purple-500 p-5 m-5 rounded-sm"
        onPress={onLogout}>
        <Text className="text-white text-center">Clear</Text>
      </TouchableOpacity>
    </View>
  );
};
