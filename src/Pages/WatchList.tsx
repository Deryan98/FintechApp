import {Text, View} from 'react-native';
import axios from 'axios';
import {API_URL, API_KEY} from '@env';
import {useEffect, useState} from 'react';

type Props = {};

const WatchList = (props: Props) => {
  // Define the API URL
  const apiUrl = `${API_URL}/stock/metric?symbol=AAPL&metric=all&token=${API_KEY}`;
  //`${API_URL}/stock/symbol?exchange=US&token=${API_KEY}`;

  const fetchStockData = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);
  return (
    <View>
      <Text>WatchList</Text>
    </View>
  );
};

export default WatchList;
