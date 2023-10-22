import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AlertScreen from '../Pages/AlertScreen';
import WatchList from '../Pages/WatchList';
import GraphScreen from '../Pages/GraphScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => (
  <Stack.Navigator initialRouteName="Watchlist">
    <Stack.Screen name="Alert" component={AlertScreen} />
    <Stack.Screen name="Watchlist" component={WatchList} />
    <Stack.Screen name="Graph" component={GraphScreen} />
  </Stack.Navigator>
);
