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

export const useStocksStore = create<StocksState>((set, get) => ({
  symbols: [{symbol: 'BINANCE:BTCUSDT', targetPrice: '0'}],
  setSymbol: symbol => set({symbols: [...get().symbols, symbol]}),
  watchedStocks: [{s: 'BINANCE:BTCUSDT'}],
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
      return {watchedStocks: newItems};
    }),
}));
