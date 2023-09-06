import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from '../config/colors';
import { NewQuizScreen } from '../screens/NewQuizScreen';
import { AnsweringScreen } from '../screens/AnsweringScreen';
import { QuizResultScreen } from '../screens/QuizResultScreen';
import { QuizResultDetailScreen } from '../screens/QuizResultDetailScreen';
import { QuestionForm } from '../screens/QuestionForm';

// Create a stack navigator
const QuizStack = createStackNavigator();

// Define a component for the quiz stack
export const MyQuizStack = ({ route, navigation }) => {
  // Set the initial screen based on the route parameter, default to 'New Quiz Screen'
  const initialScreen = route.params?.screen || 'New Quiz Screen';

  // Use the `useFocusEffect` hook to clean up the navigation params when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      return () => navigation.setParams({ screen: null }); // Reset the params
    }, [navigation])
  );
  // Return the navigator component
  return (
    <QuizStack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        cardStyle: { backgroundColor: colors.white }
      }}
    >
      <QuizStack.Screen name='New Quiz Screen' component={NewQuizScreen} />
      <QuizStack.Screen name='Question Form' component={QuestionForm} />
      <QuizStack.Screen name='Answering Screen' component={AnsweringScreen} />
      <QuizStack.Screen
        name='Quiz Result Screen'
        component={QuizResultScreen}
      />
      <QuizStack.Screen
        name='Quiz Result Detail Screen'
        component={QuizResultDetailScreen}
      />
    </QuizStack.Navigator>
  );
};
