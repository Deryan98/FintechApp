import {API_KEY} from '@env';
import {useStocksStore} from 'Store/Stocks';
import {useEffect, useState} from 'react';
import * as _ from 'lodash';

export const useWebSocket = () => {
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);
  const {symbols, editWatchedStock} = useStocksStore(state => state);

  // Unsubscribe
  const unsubscribe = function (symbol: string) {
    socket.send(JSON.stringify({type: 'unsubscribe', symbol: symbol}));
  };

  useEffect(() => {
    if (symbols.length === 0) return;
    // Connection opened -> Subscribe
    socket.addEventListener('open', function (event) {
      console.log('open');
      for (let i = 0; i < symbols.length; i++) {
        console.log(symbols.length, ' subscripciones');
        socket.send(
          JSON.stringify({type: 'subscribe', symbol: symbols[i].symbol}),
        );
      }
      socket.send(
        JSON.stringify({type: 'subscribe', symbol: 'BINANCE:BTCUSDT'}),
      );
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      console.log('Message from server \n\n');
      const {data: stocks} = JSON.parse(event.data);
      console.log({stocks});

      // Obtenemos una lista de todos los valores únicos en la propiedad "s"
      const valoresUnicosS = _.uniq(stocks.map(item => item.s));

      console.log({valoresUnicosS});

      const preStocks = [];

      // Creamos una lista de objetos que coincidan con el valor aleatorio en la propiedad "s"
      for (let i = 0; i < valoresUnicosS.length; i++) {
        const elementosSeleccionados = stocks.filter(
          item => item.s === valoresUnicosS[i],
        );

        preStocks.push(elementosSeleccionados[0]);
      }
      console.log('preStocks');
      console.log(JSON.stringify(preStocks));
      preStocks.forEach(preStock => {
        editWatchedStock(preStock);
      });
    });

    return () => {
      for (let i = 0; i < symbols.length; i++) {
        console.log(symbols.length, 'unsubscribe');
        unsubscribe(symbols[i].symbol);
        unsubscribe('BINANCE:BTCUSDT');
      }
    };
  }, [symbols]);
};
