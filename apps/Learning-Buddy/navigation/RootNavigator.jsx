import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import StyleSheetProvider from '../providers/StyleSheetProvider';

export const RootNavigator = () => {
  const [user] = useState(true);
  // This will be replace with Auth Provider
  return (
    <StyleSheetProvider>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </StyleSheetProvider>
  );
};
