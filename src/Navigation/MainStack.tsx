import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AlertScreen} from 'Pages/AlertScreen';
import {BottomTabs} from './BottomTabs';

const Stack = createNativeStackNavigator();

export const MainStack = () => (
  <Stack.Navigator
    initialRouteName="Watchlist"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="BottomTabs" component={BottomTabs} />
    <Stack.Screen
      name="Alert"
      component={AlertScreen}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1a202c',
        },
        headerTintColor: 'white',
      }}
    />
  </Stack.Navigator>
);
