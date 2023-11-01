import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../config/colors';
import PropTypes from 'prop-types';


// Define the Textbox component
export const TextBox = ({ text, setText, editable }) => {

  return (
    <View style={localStyles.textInputContainer}>
    <TextInput
      mode='flat'
      underlineColor={colors.white}
      activeUnderlineColor={colors.white}
      style={localStyles.input}
      onChangeText={(text) => setText(text)}
      defaultValue={text}
      editable={editable}
    />
  </View>)
}

const localStyles = StyleSheet.create({
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    width: '100%',
    margin: 10,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    backgroundColor: colors.lightGrey
  }
});

TextBox.defaultProps = {
  editable: true
}