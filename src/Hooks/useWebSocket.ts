import {API_KEY} from '@env';
import {useStocksStore} from 'Store/StocksStore';
import {useEffect, useState} from 'react';
import * as _ from 'lodash';
import {useDebounce} from './useDebounce';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useLinearGraphStore} from 'Store/LinearGraphStore';
import {Platform} from 'react-native';

export const useWebSocket = () => {
  //retrieve states from zustand
  const {symbols, editWatchedStock, setSymbol} = useStocksStore(state => state);
  const {setTransactStock} = useLinearGraphStore(state => state);

  //state to manage remote stocks
  const [stocks, setStocks] = useState([]);

  // debounced stocks after a time has passed
  const stocksDbc = useDebounce(stocks);

  const notifyHighPrice = ({s, p}: StockRealTime) => {
    const title = 'High price reached';
    const message = `${s} stock reached $${p}`;
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        channelId: 'stock-alert',
        title,
        message,
      });
    }
    if (Platform.OS === 'ios') {
      console.log('ENtro al ios noti');
      PushNotificationIOS.addNotificationRequest({
        id: s,
        title: title,
        body: message,
      });
    }
  };

  // transform data, selecting values and saving state
  const saveSocketData = async (stocksP: StockRealTime[]) => {
    try {
      // get a list of all unique values with 's' property
      const valoresUnicosS = _.uniq(stocksP.map(item => item.s));
      //array for preparing stocks
      const preStocks: StockRealTime[] = [];
      // creating an object list that matched the aleatory value for 's' property
      valoresUnicosS.forEach((valorUnico: string) => {
        const elementosSeleccionados = stocksP.filter(
          item => item.s === valorUnico,
        );
        preStocks.push(elementosSeleccionados[0]);
      });
      if (preStocks.length === 0) return;
      preStocks.forEach(preStock => {
        const symbol = symbols.get(preStock.s);
        const targetPriceP = Number.parseFloat(symbol?.targetPrice!);

        if (!symbol?.notified) {
          if (preStock.p! >= targetPriceP) {
            setSymbol({...symbol!, notified: true});
            notifyHighPrice(preStock);
          }
        }

        setTransactStock(preStock);
        editWatchedStock(preStock);
      });
    } catch (error) {
      console.error(error?.message);
    }
  };

  useEffect(() => {
    if (stocksDbc.length === 0) return;
    saveSocketData(stocksDbc);
  }, [stocksDbc]);

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

    socket.onopen = function (event) {
      console.log('open');
      Array.from(symbols.values()).forEach(({symbol}) => {
        socket.send(JSON.stringify({type: 'subscribe', symbol}));
      });
      console.log(symbols.size, ' opened');
    };
    // Listen for messages
    socket.onmessage = function (event) {
      const {data} = JSON.parse(event.data);
      setStocks(data);
    };

    const unsubscribe = function (symbol: string) {
      socket.send(JSON.stringify({type: 'unsubscribe', symbol: symbol}));
    };

    return () => {
      console.log('close');
      Array.from(symbols.values()).forEach(({symbol}) => {
        unsubscribe(symbol);
      });
      console.log(symbols.size, ' closed');
    };
  }, [symbols.size]);

  return {
    stocks,
  };
};
