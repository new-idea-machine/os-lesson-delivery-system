import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { DrawerNavigator } from './AppStack';
import StyleSheetProvider from '../providers/StyleSheetProvider';
import { AuthContext } from '../providers/AuthProvider';

export const RootNavigator = () => {
  const auth = useContext(AuthContext);
  const { user, session } = auth;
  return (
    <StyleSheetProvider>
      <NavigationContainer>
        {session && user ? <DrawerNavigator /> : <AuthStack />}
      </NavigationContainer>
    </StyleSheetProvider>
  );
};
