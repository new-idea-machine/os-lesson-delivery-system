import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import BigButton from '../components/BigButton';

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={localStyles.viewStyle}>
      <Image
        style={localStyles.logoStyle}
        source={require('../assets/logo_draft-2.png')}
      />
      <View style={{ marginTop: 135 }}>
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
    width: 159,
    height: 118,
    alignSelf: 'center',
    marginTop: 120
  },
  viewStyle: {
    display: 'flex',
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 10,
    height: '100%'
  }
});
