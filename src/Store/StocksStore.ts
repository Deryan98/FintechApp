import {create} from 'zustand';

type Symbol = {
  symbol: string;
  targetPrice: string;
  description?: string;
  notified?: boolean;
};

type StocksState = {
  symbols: Map<string, Symbol>;
  setSymbol: (symbol: Symbol) => void;
  watchedStocks: Map<string, StockRealTime>;
  setWatchedStock: (watchedStock: StockRealTime) => void;
  editWatchedStock: (newItem: StockRealTime) => void;
  removeStock: (symbol: string) => void;
};

export const useStocksStore = create<StocksState>((set, get) => ({
  symbols: new Map([
    ['BINANCE:BTCUSDT', {symbol: 'BINANCE:BTCUSDT', targetPrice: '34605'}],
    [
      'OANDA:EUR_SGD',
      {symbol: 'OANDA:EUR_SGD', targetPrice: '20', description: 'Apple Inc'},
    ],
    ['SPY', {symbol: 'SPY', targetPrice: '20'}],
  ]),
  setSymbol: symbol => set({symbols: get().symbols.set(symbol.symbol, symbol)}),
  watchedStocks: new Map([
    ['BINANCE:BTCUSDT', {s: 'BINANCE:BTCUSDT'}],
    ['OANDA:EUR_SGD', {s: 'OANDA:EUR_SGD'}],
    ['SPY', {s: 'SPY'}],
  ]),
  setWatchedStock: watchedStock =>
    set({watchedStocks: get().watchedStocks.set(watchedStock.s, watchedStock)}),
  editWatchedStock: newItem =>
    set({watchedStocks: get().watchedStocks.set(newItem.s, newItem)}),
  removeStock: symbol =>
    set(() => {
      const filteredWatchedStocks = get().watchedStocks;
      filteredWatchedStocks.delete(symbol);
      const filteredSymbols = get().symbols;
      filteredSymbols.delete(symbol);
      return {watchedStocks: filteredWatchedStocks, symbols: filteredSymbols};
    }),
}));
