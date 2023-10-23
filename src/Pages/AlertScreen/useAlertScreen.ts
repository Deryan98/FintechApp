import {useEffect, useState} from 'react';
import {API_URL, API_KEY} from '@env';
import axios from 'axios';

export const useAlertScreen = () => {
  // Define the API URL
  const apiUrl = `${API_URL}/stock/symbol?exchange=US&mic=XNYS&token=${API_KEY}`;
  //`${API_URL}/stock/metric?symbol=AAPL&metric=all&token=${API_KEY}`;

  const [stocks, setStocks] = useState([]);
  const [isLoadig, setIsLoadig] = useState(false);

  const fetchStockData = async () => {
    setIsLoadig(true);
    try {
      console.log('try');
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setStocks(data);
        setIsLoadig(false);
      } else {
        console.error(`Error: ${response.status}`);
        setIsLoadig(false);
      }
    } catch (error) {
      console.log('catch');
      console.error(`Error: ${error.message}`);
      setIsLoadig(false);
    } finally {
      console.log('finally');
      setIsLoadig(false);
    }
  };

  useEffect(() => {
    if (stocks.length === 0) fetchStockData();
  }, [stocks]);

  return {
    stocks,
    isLoadig,
  };
};
