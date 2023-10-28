import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AlertScreen} from 'Pages/AlertScreen';
import {WatchList} from 'Pages/WatchList';
import {GraphScreen} from 'Pages/GraphScreen';
import {LoginScreen} from 'Pages/LoginScreen';
import {LoadingScreen} from 'Pages/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useAuthStore} from 'Store/Auth';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  const [token, setToken] = useState<string | null>(null);
  const {authStatus, setAuthStatus} = useAuthStore(state => state);

  useEffect(() => {
    const retrieveToken = async () => {
      const tokenResponse = await AsyncStorage.getItem('@token');
      setToken(tokenResponse);
    };

    retrieveToken();
  }, []);

  useEffect(() => {
    if (!token) setAuthStatus('not-auth');
    else setAuthStatus('auth');
  }, [token]);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1a202c',
        },
        headerTintColor: 'white',
      }}>
      {authStatus === 'checking' && (
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{headerShown: false}}
        />
      )}
      {authStatus === 'not-auth' && (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </>
      )}
      {authStatus === 'auth' && (
        <>
          <Stack.Screen
            name="Watchlist"
            component={WatchList}
            options={{headerShown: false}}
          />

          <Stack.Screen name="Graph" component={GraphScreen} />
          <Stack.Screen name="Alert" component={AlertScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
