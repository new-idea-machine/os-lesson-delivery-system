import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';

const BigButton = ({navigation, content}) => {

    const navigating = () => {
        navigation.navigate('Test Screen')
    }

  return (
    <View style={{alignItems:'center'}}>
      <Button
        mode='contained'
        buttonColor='#3CC982'
        textColor='#262626'
        labelStyle={styles.fontStyle}
        style={styles.button}
        uppercase='true'
        onPress={navigating}
      >
        {content}
      </Button>
    </View>
  );
};

export default BigButton;

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'SemiBold',
    fontSize:15,
  },
  button: {
    width:265,
    height:55,
    display:'flex',
    justifyContent:'center'
  }
});
