import {API_KEY} from '@env';
import {useStocksStore} from 'Store/Stocks';
import {useEffect, useState} from 'react';
import * as _ from 'lodash';
import {useDebounce} from './useDebounce';

export const useWebSocket = () => {
  //set socket config
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

  //retrieve states from zustand
  const {symbols, editWatchedStock} = useStocksStore(state => state);

  //state to manage remote stocks
  const [stocks, setStocks] = useState([]);

  // debounced stocks after a time has passed
  const stocksDbc = useDebounce(stocks);

  // Unsubscribe metrod for socket event
  const unsubscribe = function (symbol: string) {
    socket.send(JSON.stringify({type: 'unsubscribe', symbol: symbol}));
  };

  //
  const saveSocketData = async (stocks: StockRealTime[]) => {
    // get a list of all unique values with 's' property
    const valoresUnicosS = _.uniq(stocks.map(item => item.s));

    //array fot preparing stocks
    const preStocks = [];

    // creating an object list that matched the aleatory value for 's' property
    for (let i = 0; i < valoresUnicosS.length; i++) {
      const elementosSeleccionados = stocks.filter(
        item => item.s === valoresUnicosS[i],
      );
      preStocks.push(elementosSeleccionados[0]);
    }
    if (preStocks.length === 0) return;
    console.log({preStocks});
    preStocks.forEach(preStock => {
      editWatchedStock(preStock);
    });
  };

  useEffect(() => {
    if (stocksDbc.length === 0) return;
    saveSocketData(stocksDbc);
  }, [stocksDbc]);

  useEffect(() => {
    if (symbols.length === 0) return;
    // Connection opened -> Subscribe
    socket.onopen = function (event) {
      console.log('open');
      symbols.forEach(({symbol}) => {
        socket.send(JSON.stringify({type: 'subscribe', symbol}));
      });
    };
    // Listen for messages
    socket.onmessage = function (event) {
      console.log('Message from server');
      const {data} = JSON.parse(event.data);
      setStocks(data);
    };

    return () => {
      for (let i = 0; i < symbols.length; i++) {
        console.log(symbols.length, 'unsubscribe');
        unsubscribe(symbols[i].symbol);
      }
    };
  }, [symbols]);
};
