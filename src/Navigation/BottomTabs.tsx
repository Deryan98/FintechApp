import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SocketProvider} from 'Context/SocketContext';
import GraphLinearScreen from 'Pages/GraphLinearScreen/GraphLinearScreen';
import {WatchListScreen} from 'Pages/WatchListScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLineChart} from '@fortawesome/free-solid-svg-icons/faLineChart';
import {faMoneyBillTrendUp} from '@fortawesome/free-solid-svg-icons/faMoneyBillTrendUp';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <SocketProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#1a202c',
            height: Platform.OS === 'ios' ? 80 : 70,
            paddingBottom: Platform.OS === 'ios' ? 25 : 15,
          },

          tabBarActiveTintColor: '#f7fafc',
          tabBarInactiveTintColor: '#a0aec0',
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="Watchlist"
          component={WatchListScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon
                icon={faMoneyBillTrendUp}
                color={color}
                size={size}
              />
            ),
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
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faLineChart} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </SocketProvider>
  );
};
