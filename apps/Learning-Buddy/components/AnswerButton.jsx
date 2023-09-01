import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../config/colors';

const AnswerButton = ({
  content,
  onPress,
  isChosenAnswer,
  isCorrectAnswer,
  ...props
}) => {
  let textColor = colors.black;
  let borderColor = colors.black;
  let iconComponent = null;

  if (isCorrectAnswer) {
    textColor = colors.lightBlue;
    borderColor = colors.lightBlue;
    iconComponent = (
      <AntDesign
        name='check'
        size={24}
        color={colors.lightBlue}
        style={localStyles.icon}
      />
    );
  } else if (isChosenAnswer) {
    textColor = colors.red;
    borderColor = colors.red;
    iconComponent = (
      <AntDesign name='close' size={24} color={colors.red} style={localStyles.icon} />
    );
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <Button
        mode='outlined'
        labelStyle={[localStyles.fontStyle, { color: textColor }]}
        style={[localStyles.button, { borderColor }, localStyles.buttonContent]}
        {...props}
        contentStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {content}
        <View style={localStyles.iconContainer}>{iconComponent}</View>
      </Button>
    </View>
  );
};

const localStyles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '700'
  },
  button: {
    width: 265,
    height: 55,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 5,
    marginVertical: 10
  },
  buttonContent: {
    paddingTop: 7,
    paddingHorizontal: 1
  },
  iconContainer: {
    marginLeft: 1 
  },
  icon: {
    marginLeft: 105 
  }
});

export default AnswerButton;
