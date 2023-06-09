import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { QuestionForm } from '../screens/QuestionForm';
import { TestScreen } from '../screens/TestScreen';

const Stack = createStackNavigator();

export const AppStack = () => {
  // const navigation = useNavigation();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Test Screen'>
        <Stack.Screen
          name='Question Form'
          component={QuestionForm}
        ></Stack.Screen>
        <Stack.Screen name='Test Screen' component={TestScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
