import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QuestionForm } from '../screens/QuestionForm';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { TestScreen } from '../screens/TestScreen';
import {HomeScreen} from '../screens/HomeScreen'

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home Screen'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='Question Form'
          component={QuestionForm}
        ></Stack.Screen>
        <Stack.Screen name='Test Screen' component={TestScreen} />
        <Stack.Screen name='Log in' component={LoginScreen} />
        <Stack.Screen name='Sign up' component={SignUpScreen} />
        <Stack.Screen name ='Home Screen' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
