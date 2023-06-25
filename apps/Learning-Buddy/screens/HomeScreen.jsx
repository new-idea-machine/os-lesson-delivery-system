import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import BigButton from '../components/BigButton';

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={localStyles.viewStyle}>
      <Image
        style={localStyles.logoStyle}
        source={require('../assets/logo_placeholder-1.png')}
      />
      <View style={{ marginTop: 95 }}>
        <BigButton
          navigation={navigation}
          content={'log in'}
          destination={'Log in'}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <BigButton
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
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 10,
    height: '100%'
  }
});
