import {useEffect, useState} from 'react';
import {API_URL, API_KEY} from '@env';
import axios from 'axios';

export const useAlertScreen = () => {
  const apiUrl = `${API_URL}/stock/symbol?exchange=US&currency=USD&mic=XNYS&token=${API_KEY}`;

  const [rawData, setRowData] = useState<StockSymbol[]>([]);
  const [isLoadig, setIsLoadig] = useState(false);

  const [stockSymbols, setStockSymbols] = useState<LabelValue[]>([]);

  const fetchStockData = async () => {
    setIsLoadig(true);
    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        const data = response.data;
        setRowData(data);
        transformStockSymbol();
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error: ${error?.message}`);
    } finally {
      setIsLoadig(false);
    }
  };
  const transformStockSymbol = () => {
    setStockSymbols(
      rawData.map(({description, symbol}) => ({
        label: description,
        value: symbol,
      })),
    );
  };

  useEffect(() => {
    if (stockSymbols.length === 0) fetchStockData();
  }, [stockSymbols]);

  return {
    stockSymbols,
    setStockSymbols,
    isLoadig,
  };
};
