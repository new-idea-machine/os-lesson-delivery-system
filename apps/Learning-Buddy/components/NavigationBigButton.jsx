import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import { colors } from '../config/colors';

const NavigationBigButton = ({ navigation, content, formVerify, destination }) => {
  const navigatingVerify = () => {
    const result = formVerify();
    if (result) navigation.navigate(destination);
  };
  const navigating = () => {
    navigation.navigate(destination);
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Button
        mode='elevated'
        buttonColor={colors.green}
        textColor={colors.black}
        labelStyle={styles.fontStyle}
        style={styles.button}
        uppercase='true'
        onPress={formVerify ? navigatingVerify : navigating}
      >
        {content}
      </Button>
    </View>
  );
};

export default NavigationBigButton;

const styles = StyleSheet.create({
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
