import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../config/colors';
import loadingImage from '../assets/Logo.png';

const Spinner = () => {
  useEffect(() => {
    console.log('💫 Spinner component is being used.');
  }, []);
  return (
    <View style={LocalStyles.container}>
      <Image source={loadingImage} style={LocalStyles.image} />
      <ActivityIndicator animating={true} color={colors.green} size='large' />
    </View>
  );
};

export default React.memo(Spinner);

const LocalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 160
  },
  image: {
    resizeMode: 'contain',
    width: 100
  }
});
