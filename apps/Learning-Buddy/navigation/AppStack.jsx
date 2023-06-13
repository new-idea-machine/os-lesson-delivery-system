import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QuestionForm } from '../screens/QuestionForm';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { TestScreen } from '../screens/TestScreen';

const Stack = createStackNavigator();

export const AppStack = () => {
  // const navigation = useNavigation();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Sign up'>
        <Stack.Screen
          name='Question Form'
          component={QuestionForm}
        ></Stack.Screen>
        <Stack.Screen name='Test Screen' component={TestScreen}></Stack.Screen>
        <Stack.Screen name='Sign in' component={SignInScreen} />
        <Stack.Screen name='Sign up' component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
