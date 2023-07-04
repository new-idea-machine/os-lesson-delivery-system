import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import { colors } from '../config/colors';

const FunctionOnPressBigButton = ({ content, onPress, ...props }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Button
        mode='elevated'
        labelStyle={localStyles.fontStyle}
        style={localStyles.button}
        uppercase='true'
        onPress={() => onPress()}
        {...props}
      >
        {content}
      </Button>
    </View>
  );
};

export default FunctionOnPressBigButton;

const localStyles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'SemiBold',
    fontSize: 15,
    letterSpacing: 1
  },
  button: {
    width: 265,
    height: 55,
    display: 'flex',
    justifyContent: 'center',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30
  }
});
