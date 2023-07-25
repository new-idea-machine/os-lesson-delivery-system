import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import { colors } from '../config/colors';

const AnswerButton = ({ content, onPress, ...props }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Button
        mode='elevated'
        labelStyle={localStyles.fontStyle}
        style={localStyles.button}
        {...props}
      >
        {content}
      </Button>
    </View>
  );
};

const localStyles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    letterSpacing: 1,
    color: colors.black,
    fontWeight: 700
  },
  button: {
    width: 265,
    height: 55,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 5,
    marginVertical: 10
  }
});

export default AnswerButton;
