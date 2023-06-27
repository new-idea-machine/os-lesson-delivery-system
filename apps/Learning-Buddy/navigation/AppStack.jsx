import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../config/colors';
import { QuestionForm } from '../screens/QuestionForm';
import { TestScreen } from '../screens/TestScreen';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Test Screen'
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.white }
      }}
    >
      <Stack.Screen
        name='Question Form'
        component={QuestionForm}
      ></Stack.Screen>
      <Stack.Screen name='Test Screen' component={TestScreen} />
    </Stack.Navigator>
  );
};
