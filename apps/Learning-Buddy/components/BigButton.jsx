import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const BigButton = ({ content, onPress, ...props }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Button
        mode='elevated'
        labelStyle={localStyles.fontStyle}
        style={localStyles.button}
        onPress={() => onPress()}
        {...props}
      >
        {content}
      </Button>
    </View>
  );
};

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
    borderRadius: 30,
    marginVertical: 10
  }
});

export default BigButton;
