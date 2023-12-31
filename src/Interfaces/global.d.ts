import {TextStyle} from 'react-native';
declare global {
  type MainStackParamList = {
    BottomTabs: undefined;
    GraphCandles: {symbol: string};
    GraphLinear: {symbol: string};
    Alert: undefined;
    WelcomeScreen: undefined;
    Loading: undefined;
  };

  type BottomTabsParamList = {
    WatchList: undefined;
  };

  type AuthStatus = 'checking' | 'auth' | 'not-auth';

  interface StockRealTime {
    s: string;
    c?: any;
    p?: number;
    t?: number;
    v?: number;
  }

  interface StockSymbol {
    currency: string;
    description: string;
    displaySymbol: string;
    figi: string;
    mic: string;
    symbol: string;
    type: string;
  }

  interface RawStockCandle {
    s: string;
    c: number[];
    h: number[];
    l: number[];
    o: number[];
    t: number[];
    v: number[];
  }

  interface StockCandle {
    x: number;
    close: number;
    shadowH: number;
    shadowL: number;
    open: number;
  }

  interface LabelValue {
    label: string;
    value: string;
  }

  type TransactStock = {
    value: number;
    label?: String;
    date?: string;
    labelTextStyle?: TextStyle;
  };
}
