import {create} from 'zustand';

type TransactStock = {
  value: number;
  date: string;
  label?: string;
  labelTextStyle?: {
    color: string;
    width: number;
  };
};

type HistoryStock = {
  symbol: string;
  transactStocks: TransactStock[];
};

type LinearGraphState = {
  historyStocks: HistoryStock[];
  setHistStock: (symbol: string) => void;
  removeHistStock: (symbol: string) => void;
};

export const useLinearGraphStore = create<LinearGraphState>((set, get) => ({
  historyStocks: [
    {symbol: 'AAPL', transactStocks: []},
    {symbol: 'BINANCE:BTCUSDT', transactStocks: []},
    {symbol: 'IC MARKETS:1', transactStocks: []},
  ],
  setHistStock: symbol =>
    set({
      historyStocks: [
        ...get().historyStocks,
        {
          symbol,
          transactStocks: [],
        },
      ],
    }),
  removeHistStock: symbol =>
    set({
      historyStocks: [
        ...get().historyStocks.filter(
          historyStock => historyStock.symbol !== symbol,
        ),
      ],
    }),
}));
