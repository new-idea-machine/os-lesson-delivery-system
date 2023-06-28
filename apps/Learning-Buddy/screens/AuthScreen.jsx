import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import NavigationBigButton from '../components/NavigationBigButton';

export const AuthScreen = ({ navigation }) => {
  return (
    <View style={localStyles.viewStyle}>
      <Image
        style={localStyles.logoStyle}
        source={require('../assets/logo_placeholder-1.png')}
      />
      <View style={{ marginTop: 95 }}>
        <NavigationBigButton
          navigation={navigation}
          content={'log in'}
          destination={'Log in'}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <NavigationBigButton
          navigation={navigation}
          content={'sign up'}
          destination={'Sign up'}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  logoStyle: {
    alignSelf: 'center',
    marginTop: 90
  },
  viewStyle: {
    display: 'flex',
    paddingTop: 50,
    paddingHorizontal: 10,
    height: '100%'
  }
});
