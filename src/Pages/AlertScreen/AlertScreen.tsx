import {BodyContainer} from 'Components/atoms/BodyContainer';
import {SafeAVContainer} from 'Components/atoms/SafeAVContainer';
import {useState} from 'react';
import {Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type Props = {};

export const AlertScreen = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  return (
    <SafeAVContainer>
      <BodyContainer>
        <View className="items-center justify-center">
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </BodyContainer>
    </SafeAVContainer>
  );
};
