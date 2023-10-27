import {API_KEY} from '@env';
import {useStocksStore} from 'Store/Stocks';
import {useEffect, useState} from 'react';
import * as _ from 'lodash';
import {useDebounce} from './useDebounce';

export const useWebSocket = () => {
  //set socket config

  //retrieve states from zustand
  const {symbols, editWatchedStock} = useStocksStore(state => state);

  console.log({symbols});

  //state to manage remote stocks
  // const [stocks, setStocks] = useState([]);

  // debounced stocks after a time has passed
  // const stocksDbc = useDebounce(stocks);

  // Unsubscribe metrod for socket event
  const unsubscribe = function (symbol: string) {
    socket.send(JSON.stringify({type: 'unsubscribe', symbol: symbol}));
  };

  //
  const saveSocketData = async (stocksP: StockRealTime[]) => {
    // get a list of all unique values with 's' property

    try {
      const valoresUnicosS = _.uniq(stocksP.map(item => item.s));

      //array for preparing stocks
      const preStocks: StockRealTime[] = [];

      console.log({valoresUnicosS});

      // creating an object list that matched the aleatory value for 's' property
      valoresUnicosS.forEach((valorUnico: string) => {
        const elementosSeleccionados = stocksP.filter(
          item => item.s === valorUnico,
        );
        console.log({elementosSeleccionados});
        preStocks.push(elementosSeleccionados[0]);
      });

      if (preStocks.length === 0) return;
      console.log({preStocks});
      preStocks.forEach(preStock => {
        editWatchedStock(preStock);
      });
    } catch (error) {
      console.error(error?.message);
    }
  };

  // useEffect(() => {
  //   if (stocksDbc.length === 0) return;
  //   saveSocketData(stocksDbc);
  // }, [stocksDbc]);

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

    socket.onopen = function (event) {
      console.log('open');
      Array.from(symbols.values()).forEach(({symbol}) => {
        socket.send(JSON.stringify({type: 'subscribe', symbol}));
      });
    };
    // Listen for messages
    socket.onmessage = function (event) {
      console.log('Message from server');
      const {data} = JSON.parse(event.data);
      saveSocketData(data);
    };

    return () => {
      Array.from(symbols.values()).forEach(({symbol}) => {
        unsubscribe(symbol);
      });
      console.log(symbols.size, 'unsubscribe');
    };
  }, []);
};
