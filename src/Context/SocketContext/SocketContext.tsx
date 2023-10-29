import {createContext} from 'react';
import {useWebSocket} from 'Hooks/useWebSocket';

interface ThemeContextProps {
  stocks: StockRealTime[];
}

export const SocketContext = createContext({} as ThemeContextProps);

export const SocketProvider = ({children}: any) => {
  const {stocks} = useWebSocket();

  return (
    <SocketContext.Provider value={{stocks}}>{children}</SocketContext.Provider>
  );
};
