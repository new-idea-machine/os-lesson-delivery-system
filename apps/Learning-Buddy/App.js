import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStack } from './navigation/AppStack';
import StyleSheetProvider from './providers/StyleSheetProvider';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    SemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    Medium: require('./assets/fonts/Poppins-Medium.ttf'),
    Bold: require('./assets/fonts/Poppins-Bold.ttf')
  });
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StyleSheetProvider>
        <AppStack />
      </StyleSheetProvider>
    </SafeAreaProvider>
  );
}
