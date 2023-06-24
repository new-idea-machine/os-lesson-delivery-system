import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';

const MenuInput = ({ placeholder, symbol, required, hidden, setter }) => {
  
  return (
    <>
      <TextInput
        label={
          <Text>
            {placeholder}
            {required? <Text style={{ color: 'red' }}> *</Text> : null}
          </Text>
        }
        style={styles.inputContainer}
        mode='outlined'
        secureTextEntry={hidden == 'true'? true : false}
        theme={{ colors: { onSurfaceVariant: '#979797' } }} 
        left={
          <TextInput.Icon icon={symbol} iconColor='#979797' color={'blue'} />
        }
        outlineColor='transparent'
        activeOutlineColor='#00B0FC'
        onChangeText={text => setter(text)}
      />
    </>
  );
};

export default MenuInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    width: 266,
    fontFamily: 'Poppins',
    fontSize: 12,
    backgroundColor: '#EFEFEF'
  },
  lockColor: {
    color: 'blue'
  }
});
