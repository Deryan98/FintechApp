import {create} from 'zustand';

type OpaqueColorValue = symbol & {__TYPE__: 'Color'};
type ColorValue = string | OpaqueColorValue;
type TransactStock = {
  value: number;
  label?: String;
  labelComponent?: Function;
  labelTextStyle?: any;
  dataPointText?: string;
  textShiftX?: number;
  textShiftY?: number;
  textColor?: string;
  textFontSize?: number;

  hideDataPoint?: boolean;
  dataPointHeight?: number;
  dataPointWidth?: number;
  dataPointRadius?: number;
  dataPointColor?: string;
  dataPointShape?: string;
  customDataPoint?: Function;

  stripHeight?: number;
  stripWidth?: number;
  stripColor?: ColorValue | String | any;
  stripOpacity?: number;

  focusedDataPointShape?: String;
  focusedDataPointWidth?: number;
  focusedDataPointHeight?: number;
  focusedDataPointColor?: ColorValue | String | any;
  focusedDataPointRadius?: number;
  focusedCustomDataPoint?: Function;

  dataPointLabelComponent?: Function;
  focusedDataPointLabelComponent?: Function;
  dataPointLabelWidth?: number;
  dataPointLabelShiftX?: number;
  dataPointLabelShiftY?: number;
  showStrip?: boolean;

  showVerticalLine?: boolean;
  verticalLineUptoDataPoint?: boolean;
  verticalLineColor?: string;
  verticalLineThickness?: number;
  verticalLineStrokeDashArray?: Array<number>;
  pointerShiftX?: number;
  pointerShiftY?: number;
  onPress?: Function;
  showXAxisIndex?: boolean;
};

type HistoryStock = {
  symbol: string;
  transactStocks: TransactStock[];
};

type LinearGraphState = {
  historyStocks: HistoryStock[];
  setHistStock: (symbol: string) => void;
  removeHistStock: (symbol: string) => void;
  setTransactStock: (stock: StockRealTime) => void;
};

export const useLinearGraphStore = create<LinearGraphState>((set, get) => ({
  historyStocks: [
    {symbol: 'BINANCE:BTCUSDT', transactStocks: []},
    {symbol: 'OANDA:EUR_SGD', transactStocks: []},
    {symbol: 'TSLA', transactStocks: []},
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
  setTransactStock: newStock =>
    set(() => {
      //validando si  existe el simbolo
      if (
        !!!get().historyStocks.find(
          historyStock => historyStock.symbol === newStock.s,
        )
      ) {
        return {historyStocks: get().historyStocks};
      }

      const indexToChange = get()
        .historyStocks.map(item => item.symbol === newStock.s)
        .indexOf(true);

      const newHistoryStocks = [...get().historyStocks];

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
              value:
                newStock?.p ??
                newHistoryStocks[indexToChange].transactStocks[
                  newHistoryStocks[indexToChange].transactStocks.length - 1
                ].value,
              label:
                newStock.t?.toString() ??
                newHistoryStocks[indexToChange].transactStocks[
                  newHistoryStocks[indexToChange].transactStocks.length - 1
                ].label,
            },
          ],
        };
        return {historyStocks: newHistoryStocks};
      } else {
        newHistoryStocks[indexToChange] = {
          symbol: newStock.s,
          transactStocks: [
            ...newHistoryStocks[indexToChange].transactStocks,
            {
              value:
                newStock?.p ??
                newHistoryStocks[indexToChange].transactStocks[
                  newHistoryStocks[indexToChange].transactStocks.length - 1
                ].value,
              label:
                newStock.t?.toString() ??
                newHistoryStocks[indexToChange].transactStocks[
                  newHistoryStocks[indexToChange].transactStocks.length - 1
                ].label,
            },
          ],
        };
        return {historyStocks: newHistoryStocks};
      }
    }),
}));
