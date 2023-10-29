import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AlertScreen} from 'Pages/AlertScreen';
import {GraphCandlesScreen} from 'Pages/GraphCandlesScreen';
import {WelcomeScreen} from 'Pages/WelcomeScreen';
import {LoadingScreen} from 'Pages/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useAuthStore} from 'Store/AuthStore';
import {BottomTabs} from './BottomTabs';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  const {authStatus, setAuthStatus} = useAuthStore(state => state);

  useEffect(() => {
    const retrieveToken = async () => {
      const tokenResponse = await AsyncStorage.getItem('@token');
      if (!tokenResponse) setAuthStatus('not-auth');
      else setAuthStatus('auth');
    };

    retrieveToken();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
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
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
      {authStatus === 'auth' && (
        <>
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{headerShown: false}}
          />

          <Stack.Screen name="GraphCandles" component={GraphCandlesScreen} />
          <Stack.Screen
            name="Alert"
            component={AlertScreen}
            options={{title: 'Add New Stock'}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
