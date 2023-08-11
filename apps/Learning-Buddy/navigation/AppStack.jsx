import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { colors } from '../config/colors';
import { QuestionForm } from '../screens/QuestionForm';
import { HomeScreen } from '../screens/HomeScreen';
import { AnsweringScreen } from '../screens/AnsweringScreen';
import { NewQuizScreen } from '../screens/NewQuizScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { QuizResultScreen } from '../screens/QuizResultScreen';
import { QuizResultDetailScreen } from '../screens/QuizResultDetailScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Home Screen'
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.white,
          height: 350,
          width: 250,
          borderRadius: 16,
          margin: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        drawerActiveTintColor: colors.green,
        drawerInactiveTintColor: colors.black
      }}
    >
      <Drawer.Screen
        name='Home Screen'
        component={HomeScreen}
        options={{
          headerShown: true,
          drawerLabel: 'Home',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <Octicons name='home' size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name='New Quiz Screen'
        component={NewQuizScreen}
        options={{
          headerShown: true,
          drawerLabel: 'Create New Quiz',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <AntDesign name='pluscircleo' size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name='Results Screen'
        component={ResultsScreen}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen
        name='Quiz Result Screen'
        component={QuizResultScreen}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen
        name='Quiz Result Detail Screen'
        component={QuizResultDetailScreen}
        options={{
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  );
};
