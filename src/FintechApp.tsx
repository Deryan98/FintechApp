import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PropsWithChildren} from 'react';
import {MainStack} from './Navigation/MainStack';

type Props = {};

const AppState = ({children}: PropsWithChildren) => (
  <SafeAreaProvider>
    <NavigationContainer>{children}</NavigationContainer>
  </SafeAreaProvider>
);

const FintechApp = (props: Props) => {
  return (
    <AppState>
      <MainStack />
    </AppState>
  );
};

export default FintechApp;
