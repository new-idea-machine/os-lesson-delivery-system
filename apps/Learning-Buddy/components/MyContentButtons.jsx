import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../config/colors';

const MyContentButtons = ({ ...props }) => {
  let textColor = colors.black;
  let borderColor = colors.black;
  const MyContentButtonsNames = ['All Quizzes', 'Folders', 'Categories'];

  return (
    <View style={localStyles.container}>
      {MyContentButtonsNames.map((buttonName, key) => (
        <Button
          labelStyle={[localStyles.fontStyle, { color: textColor }]}
          mode='outlined'
          style={localStyles.button}
          key={key}
          {...props}
        >
          <Text style={localStyles.fontFamily}>{buttonName}</Text>
        </Button>
      ))}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'start'
  },
  button: {
    margin: 10,
    borderRadius: 5,
    width: 134
  },

  md3FontStyles: {
    lineHeight: 32
  },
  fontStyles: {
    fontWeight: '800',
    fontSize: 24,
  },
  fontFamily: {
    fontFamily: 'Poppins'
  }
});

export default MyContentButtons;
