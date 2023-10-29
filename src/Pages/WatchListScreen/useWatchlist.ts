import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from 'Store/AuthStore';
import {useStocksStore} from 'Store/StocksStore';
import {useAuth0} from 'react-native-auth0';

export const useWatchlist = () => {
  const {watchedStocks} = useStocksStore(state => state);
  const {clearSession, user} = useAuth0();
  const {setAuthStatus} = useAuthStore(state => state);

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    setAuthStatus('checking');
    try {
      await clearSession();
      await AsyncStorage.removeItem('@token');
      setAuthStatus('not-auth');
    } catch (e) {
      setAuthStatus('auth');
      console.log(e);
    }
  };

  return {
    watchedStocks,
    loggedIn,
    onLogout,
    user,
  };
};
