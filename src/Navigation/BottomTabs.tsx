import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SocketProvider} from 'Context/SocketContext';
import GraphLinearScreen from 'Pages/GraphLinearScreen/GraphLinearScreen';
import {WatchListScreen} from 'Pages/WatchListScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <SocketProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#1a202c',
            height: 60,
            paddingVertical: 10,
          },
          tabBarActiveTintColor: '#f7fafc',
          tabBarInactiveTintColor: '#a0aec0',
        }}>
        <Tab.Screen
          name="Watchlist"
          component={WatchListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="GraphLinear"
          component={GraphLinearScreen}
          options={{
            headerStyle: {
              backgroundColor: '#1a202c',
              height: 75,
            },
            headerTintColor: 'white',
            headerTitle: 'Linear Graph',
            tabBarLabel: 'Linear Graph',
          }}
        />
      </Tab.Navigator>
    </SocketProvider>
  );
};
