import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
