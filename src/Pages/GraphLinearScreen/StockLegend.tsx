import {useLinearGraphStore} from 'Store/LinearGraph';
import {useMemo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

interface Props {
  legend: string;
  gridSize: string;
}

const StockLegend = ({legend, gridSize = '1'}: Props) => {
  const {historyStocks, setHistStock, removeHistStock} = useLinearGraphStore(
    state => state,
  );
  const toast = useToast();

  const symbolExistInHistory = !!historyStocks.find(
    historyStock => historyStock.symbol === legend,
  );

  const onPressItem = () => {
    console.log('historyStocks.length: ', historyStocks.length);
    console.log('symbolExistInHistory: ', symbolExistInHistory);

    if (historyStocks.length > 4) {
      if (symbolExistInHistory) {
        removeHistStock(legend);
      } else {
        toast.show("Can't add more than 5 stocks", {
          type: 'normal | success | warning | danger | custom',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
      }
      return;
    }
    if (!symbolExistInHistory) setHistStock(legend);
    else removeHistStock(legend);
  };

  return (
    <TouchableOpacity
      onPress={onPressItem}
      className={`w-[100] p-2 rounded-xl mx-2 justify-center`}
      style={{
        backgroundColor: symbolExistInHistory ? '#4299e1' : '#44337a',
      }}>
      <Text className="text-white text-center">{legend}</Text>
    </TouchableOpacity>
  );
};

export default StockLegend;
