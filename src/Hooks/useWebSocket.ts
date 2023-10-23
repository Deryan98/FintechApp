import {API_KEY} from '@env';
import {useState} from 'react';

export const useWebSocket = () => {
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

  const [stocks, setStocks] = useState([]);

  // Connection opened -> Subscribe
  socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({type: 'subscribe', symbol: 'BINANCE:BTCUSDT'}));
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    setStocks(event.data.data);
  });

  // Unsubscribe
  var unsubscribe = function (symbol) {
    socket.send(JSON.stringify({type: 'unsubscribe', symbol: symbol}));
  };

  return {
    stocks,
    socket,
    unsubscribe,
  };
};
