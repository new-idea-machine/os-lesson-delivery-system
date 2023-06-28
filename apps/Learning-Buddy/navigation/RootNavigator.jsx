import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import StyleSheetProvider from '../providers/StyleSheetProvider';
import { AuthContext } from '../providers/AuthProvider';

export const RootNavigator = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  return (
    <StyleSheetProvider>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </StyleSheetProvider>
  );
};
