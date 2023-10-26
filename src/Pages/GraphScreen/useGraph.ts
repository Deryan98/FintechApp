import {useEffect, useState} from 'react';
import {API_URL, API_KEY} from '@env';
import axios from 'axios';

const initialRowDataState = {
  s: 'no_data',
  c: [],
  h: [],
  l: [],
  o: [],
  t: [],
  v: [],
};
export const useGraph = (symbol: string) => {
  const apiUrl = `${API_URL}/stock/candle?symbol=${symbol}&resolution=30&from=1698000000&to=1698117785&token=${API_KEY}`;

  const [rawData, setRowData] = useState<RawStockCandle>(initialRowDataState);
  const [isLoadig, setIsLoadig] = useState(true);

  const [stockCandles, setStockCandles] = useState<StockCandle[]>([]);

  const transformStockCandles = () => {
    const {c, h, l, o, t, v} = rawData;
    const auxArray: StockCandle[] = [];
    for (let i = 0; i < c?.length; i++) {
      auxArray.push({
        x: t[i],
        close: c[i],
        shadowH: h[i],
        shadowL: l[i],
        open: o[i],
      });
    }
    setStockCandles(auxArray);
  };
  useEffect(() => {
    if (rawData.s === 'no_data') return;
    transformStockCandles();
  }, [rawData]);

  const fetchCandlesData = async () => {
    setIsLoadig(true);
    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        const data = response.data;
        console.log('fetchCandlesData');
        console.log(response.data);
        setRowData(data);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error: ${error?.message}`);
    } finally {
      setIsLoadig(false);
    }
  };

  useEffect(() => {
    fetchCandlesData();

    return () => {
      setRowData(initialRowDataState);
      setStockCandles([]);
    };
  }, []);
  return {
    isLoadig,
    stockCandles,
    rawData,
  };
};
