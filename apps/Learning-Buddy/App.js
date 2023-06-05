import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStack } from './navigation/AppStack';

export default function App() {

  return (
    <SafeAreaProvider>
    <AppStack />
    </SafeAreaProvider>
  );
}
