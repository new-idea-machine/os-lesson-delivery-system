import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import { AuthProvider } from './providers/AuthProvider';

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
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
