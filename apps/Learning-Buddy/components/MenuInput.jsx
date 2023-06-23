import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';

const MenuInput = ({ placeholder }) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        style={styles.inputContainer}
        mode='outlined'
        theme={{ colors: { onSurfaceVariant: '#979797'} }}
        outlineColor='transparent'
        activeOutlineColor='#00B0FC'
      />
    </>
  );
};

export default MenuInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    width:266,
    fontFamily:'Poppins',
    fontSize:12
  },

});
