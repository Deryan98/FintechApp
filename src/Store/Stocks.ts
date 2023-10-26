import {create} from 'zustand';

type Symbol = {
  symbol: string;
  targetPrice: string;
};

type StocksState = {
  symbols: Symbol[];
  setSymbol: (symbol: Symbol) => void;
  watchedStocks: StockRealTime[];
  setWatchedStock: (watchedStock: StockRealTime) => void;
  editWatchedStock: (newItem: StockRealTime) => void;
};

const initialState = {
  symbols: [
    {symbol: 'BINANCE:BTCUSDT', targetPrice: '20'},
    {symbol: 'AAPL', targetPrice: '10'},
    {symbol: 'IC MARKETS:1', targetPrice: '30'},
  ],
  watchedStocks: [{s: 'BINANCE:BTCUSDT'}, {s: 'AAPL'}, {s: 'IC MARKETS:1'}],
};

export const useStocksStore = create<StocksState>((set, get) => ({
  symbols: initialState.symbols,
  setSymbol: symbol => set({symbols: [...get().symbols, symbol]}),
  watchedStocks: initialState.watchedStocks,
  setWatchedStock: watchedStock =>
    set({watchedStocks: [...get().watchedStocks, watchedStock]}),
  editWatchedStock: newItem =>
    set(({watchedStocks}) => {
      console.log('funca');
      const indexToChange = watchedStocks
        .map(item => item.s === newItem.s)
        .indexOf(true);
      const newItems = [...watchedStocks];
      newItems[indexToChange] = newItem;
      console.log('funca2');
      console.log({newItems});
      return {watchedStocks: [...newItems]};
    }),
}));
