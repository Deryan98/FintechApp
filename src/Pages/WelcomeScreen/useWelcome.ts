import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from 'Store/Auth';
import {useAuth0} from 'react-native-auth0';

export const useWelcome = () => {
  const {authorize, error} = useAuth0();
  const {setAuthStatus} = useAuthStore(state => state);

  const onLogin = async () => {
    setAuthStatus('checking');
    try {
      const response = await authorize();
      if (response) {
        await AsyncStorage.setItem('@token', response.idToken);
        setAuthStatus('auth');
      } else setAuthStatus('not-auth');
    } catch (e) {
      setAuthStatus('not-auth');
      console.log(e);
    }
  };
  return {
    error,
    onLogin,
  };
};
