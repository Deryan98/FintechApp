import {create} from 'zustand';
import moment from 'moment';

type HistoryStock = {
  symbol: string;
  transactStocks: TransactStock[];
};

type LinearGraphState = {
  counter: number;
  historyStocks: HistoryStock[];
  setHistStock: (symbol: string) => void;
  removeHistStock: (symbol: string) => void;
  setTransactStock: (stock: StockRealTime) => void;
};

export const useLinearGraphStore = create<LinearGraphState>((set, get) => ({
  counter: 0,
  historyStocks: [{symbol: 'BINANCE:BTCUSDT', transactStocks: []}],
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
  setTransactStock: newStock =>
    set(() => {
      //validando si  existe el simbolo
      if (
        !!!get().historyStocks.find(
          historyStock => historyStock.symbol === newStock.s,
        )
      ) {
        return {historyStocks: get().historyStocks, counter: get().counter + 1};
      }

      const indexToChange = get()
        .historyStocks.map(item => item.symbol === newStock.s)
        .indexOf(true);

      const newHistoryStocks = [...get().historyStocks];

      const hasLabel = get().counter % 5 === 0;
      const timeFormatted = newStock.t
        ? moment(newStock.t).format('HH:mm:ss')
        : '';

      console.log(timeFormatted);

      if (newHistoryStocks[indexToChange].transactStocks.length > 35) {
        const selectedTransactStocks = [
          ...newHistoryStocks[indexToChange].transactStocks,
        ];
        selectedTransactStocks.shift();

        newHistoryStocks[indexToChange] = {
          symbol: newStock.s,
          transactStocks: [
            ...selectedTransactStocks,
            {
              value: newStock?.p!,
              label: timeFormatted,
              date: timeFormatted,
              labelTextStyle: hasLabel ? {color: 'lightgray', width: 60} : {},
            },
          ],
        };
        return {historyStocks: newHistoryStocks, counter: get().counter + 1};
      } else {
        newHistoryStocks[indexToChange] = {
          symbol: newStock.s,
          transactStocks: [
            ...newHistoryStocks[indexToChange].transactStocks,
            {
              value: newStock?.p!,
              label: timeFormatted,
              date: timeFormatted,
              labelTextStyle: hasLabel ? {color: 'lightgray', width: 60} : {},
            },
          ],
        };
        return {historyStocks: newHistoryStocks, counter: get().counter + 1};
      }
    }),
}));
