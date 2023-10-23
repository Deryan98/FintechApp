import {create} from 'zustand';

type Stock = {
  p: number;
  s: string;
  t: number;
  v: number;
};

type StocksState = {
  symbols: string[];
  watchedStocks: Stock[];
  setStock: (watchedStock: Stock) => void;
};

export const useStocksStore = create<StocksState>((set, get) => ({
  symbols: [],
  watchedStocks: [],
  setStock: watchedStock =>
    set({watchedStocks: [...get().watchedStocks, watchedStock]}),
}));
