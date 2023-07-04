import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const AuthScreen = ({ navigation }) => {
  return (
    <View style={localStyles.viewStyle}>
      <Image
        style={localStyles.logoStyle}
        source={require('../assets/logo_placeholder-1.png')}
      />
      <View style={{ marginTop: 95 }}>
        <BigButton
          buttonColor={colors.green}
          textColor={colors.black}
          content={'log in'}
          uppercase={true}
          onPress={() => navigation.navigate('Log in')}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <BigButton
          buttonColor={colors.green}
          textColor={colors.black}
          content={'sign up'}
          uppercase={true}
          onPress={() => navigation.navigate('Sign up')}
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
