import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthScreen } from '../screens/AuthScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { colors } from '../config/colors';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';

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
      <Stack.Screen name='Forgot Password' component={ForgotPasswordScreen} />
      <Stack.Screen name='Reset Password' component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};
