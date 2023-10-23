interface StockRealTime {
  c: any;
  p: number;
  s: string;
  t: number;
  v: number;
}

interface StockSymbol {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
}

interface LabelValue {
  label: string;
  value: string;
}
