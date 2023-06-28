import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthScreen } from '../screens/AuthScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { colors } from '../config/colors';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Auth Screen'
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.white }
      }}
    >
      <Stack.Screen name='Auth Screen' component={AuthScreen} />
      <Stack.Screen name='Log in' component={LoginScreen} />
      <Stack.Screen name='Sign up' component={SignUpScreen} />
    </Stack.Navigator>
  );
};
