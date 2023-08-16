import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import { colors } from '../config/colors';

const AnswerButton = ({ content, onPress, ...props }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Button mode='outlined' labelStyle={localStyles.fontStyle} {...props}>
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
    fontWeight: 700
  }
});

export default AnswerButton;
