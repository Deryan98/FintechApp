import {Text, View} from 'react-native';

export const PointerLabelComponent = items => {
  console.log('PointerLabelComponent');
  return (
    <View
      style={{
        height: 90,
        width: 100,
        justifyContent: 'center',
        marginTop: -30,
        marginLeft: -40,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          marginBottom: 6,
          textAlign: 'center',
        }}>
        {items[0].date}
      </Text>

      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: 16,
          backgroundColor: 'white',
        }}>
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
          {'$' + items[0].value + '.0'}
        </Text>
      </View>
    </View>
  );
};
