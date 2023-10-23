import React, { useEffect } from 'react';
import { View } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../config/colors';

const Spinner = () => {
  useEffect(() => {
    console.log('💫 Spinner component is being used.');
  }, []);
  return (
    <View>
      <ActivityIndicator animating={true} color={colors.green} size='large' />
    </View>
  );
};

export default Spinner;
