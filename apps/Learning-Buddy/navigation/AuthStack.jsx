import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='SignInScreen'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='SignInScreen' component={SignInScreen} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
    </Stack.Navigator>
  );
};
