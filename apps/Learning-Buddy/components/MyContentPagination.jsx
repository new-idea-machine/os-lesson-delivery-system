import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const MyContentPagination = () => {
  return (
    <>
      <View style={localStyles.container}>
        <AntDesign name="left" size={24} color="#979797" />
        <Text style={localStyles.text}>Last Page</Text>
        <Text style={localStyles.text}>1</Text>
        <Text style={localStyles.text}>/</Text>
        <Text style={localStyles.text}>2</Text>
        <Text style={localStyles.text}>Next Page</Text>
        <AntDesign name="right" size={24} color="#979797" />
      </View>
    </>
  );
};

const localStyles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontFamily: 'Poppins',
    height:'7%'
  },
  text: {
    fontWeight: '400',
    fontSize: 12,
    color: '#979797',
    fontFamily: 'Poppins'
  }
 
});

export default MyContentPagination;
