import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {WatchList} from 'Pages/WatchList';
import GraphScreen from 'Pages/GraphScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a202c',
        },
      }}>
      <Tab.Screen name="Watchlist" component={WatchList} />
      <Tab.Screen name="Graph" component={GraphScreen} />
    </Tab.Navigator>
  );
};
