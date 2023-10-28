import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Auth0Provider} from 'react-native-auth0';
import {PropsWithChildren} from 'react';
import {MainStack} from './Navigation/MainStack';
import {AUTH0_DOMAIN, AUTH0_CLIENT_ID} from '@env';

type Props = {};

const AppState = ({children}: PropsWithChildren) => (
  <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
    <SafeAreaProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </SafeAreaProvider>
  </Auth0Provider>
);

const FintechApp = (props: Props) => {
  return (
    <AppState>
      <MainStack />
    </AppState>
  );
};

export default FintechApp;
