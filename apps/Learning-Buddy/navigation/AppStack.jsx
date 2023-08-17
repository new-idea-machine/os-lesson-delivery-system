import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
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
  const DrawerMenuButton = () => {
    const navigation = useNavigation();

    return (
      <IconButton
        icon='menu'
        size={30}
        color={colors.black}
        rippleColor={colors.white}
        style={localStyles.DrawMenuButton}
        onPress={() => navigation.openDrawer()}
      />
    );
  };

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
          ),
          headerLeft: () => <DrawerMenuButton />
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
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
      />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.white }
      }}
    >
      <Stack.Screen name='Drawer Menu' component={DrawerNavigator} />
      <Stack.Screen name='Question Form' component={QuestionForm} />
      <Stack.Screen name='Answering Screen' component={AnsweringScreen} />
      <Stack.Screen name='Results Screen' component={ResultsScreen} />
      <Stack.Screen name='Quiz Result Screen' component={QuizResultScreen} />
      <Stack.Screen
        name='Quiz Result Detail Screen'
        component={QuizResultDetailScreen}
      />
    </Stack.Navigator>
  );
};

const localStyles = StyleSheet.create({
  DrawMenuButton: {
    marginLeft: 10,
    marginTop: 10
  }
});
