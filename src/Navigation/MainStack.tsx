import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AlertScreen} from 'Pages/AlertScreen';
import {WatchList} from 'Pages/WatchList';
import {GraphScreen} from 'Pages/GraphScreen';
import {LoginScreen} from 'Pages/LoginScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => (
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
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Watchlist"
      component={WatchList}
      options={{headerShown: false}}
    />

    <Stack.Screen name="Graph" component={GraphScreen} />
    <Stack.Screen name="Alert" component={AlertScreen} />
  </Stack.Navigator>
);
