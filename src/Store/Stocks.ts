import {create} from 'zustand';

type Symbol = {
  symbol: string;
  targetPrice: string;
  notified?: boolean;
};

type StocksState = {
  symbols: Map<string, Symbol>;
  setSymbol: (symbol: Symbol) => void;
  watchedStocks: Map<string, StockRealTime>;
  setWatchedStock: (watchedStock: StockRealTime) => void;
  editWatchedStock: (newItem: StockRealTime) => void;
};

export const useStocksStore = create<StocksState>((set, get) => ({
  symbols: new Map([
    ['BINANCE:BTCUSDT', {symbol: 'BINANCE:BTCUSDT', targetPrice: '20'}],
    ['AAPL', {symbol: 'AAPL', targetPrice: '20'}],
    ['IC MARKETS:1', {symbol: 'IC MARKETS:1', targetPrice: '20'}],
  ]),
  setSymbol: symbol => set({symbols: get().symbols.set(symbol.symbol, symbol)}),
  watchedStocks: new Map([
    ['BINANCE:BTCUSDT', {s: 'BINANCE:BTCUSDT'}],
    ['AAPL', {s: 'AAPL'}],
    ['IC MARKETS:1', {s: 'IC MARKETS:1'}],
  ]),
  setWatchedStock: watchedStock =>
    set({watchedStocks: get().watchedStocks.set(watchedStock.s, watchedStock)}),
  editWatchedStock: newItem =>
    set({watchedStocks: get().watchedStocks.set(newItem.s, newItem)}),
}));
