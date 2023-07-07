import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';

const BigButton = ({ content, onPress, ...props }) => {
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

export default BigButton;

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
    borderTopEndRadius: 30,
    marginVertical: 5
  }
});
