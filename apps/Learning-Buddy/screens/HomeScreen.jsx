import React from 'react';
import { Text, View } from 'react-native';

export const HomeScreen = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 40 }}>HomeScreen</Text>
      </View>
    </>
  );
};
