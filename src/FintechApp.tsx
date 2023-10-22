import {NavigationContainer} from '@react-navigation/native';
import {PropsWithChildren} from 'react';
import {MainStack} from './Navigation/MainStack';

type Props = {};

const AppState = ({children}: PropsWithChildren) => (
  <NavigationContainer>{children}</NavigationContainer>
);

const FintechApp = (props: Props) => {
  return (
    <AppState>
      <MainStack />
    </AppState>
  );
};

export default FintechApp;
