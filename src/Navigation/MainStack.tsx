import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AlertScreen} from 'Pages/AlertScreen';
import {WatchList} from 'Pages/WatchList';
import {GraphScreen} from 'Pages/GraphScreen';
import {LoginScreen} from 'Pages/LoginScreen';
import {LoadingScreen} from 'Pages/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useEffect} from 'react';

const Stack = createNativeStackNavigator<MainStackParamList>();

// const token = await AsyncStorage.getItem('@token');

export const MainStack = () => {
  let loginStatus: LoginStatus = 'checking';

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
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      {/* {loginStatus === 'auth' && ( */}
      <>
        <Stack.Screen
          name="Watchlist"
          component={WatchList}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Graph" component={GraphScreen} />
        <Stack.Screen name="Alert" component={AlertScreen} />
      </>
      {/* )} */}
      {/* {loginStatus === 'not-auth' && ( */}
      <>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </>
      {/* )} */}
    </Stack.Navigator>
  );
};
