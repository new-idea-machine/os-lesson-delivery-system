import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import {
  Octicons,
  AntDesign,
  Feather,
  Ionicons,
  FontAwesome5
} from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import { colors } from '../config/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { CloseDrawerMenu } from '../components/CloseDrawerMenu';

import { MyQuizStack } from './MyQuizStack';
import { MyAccountStack } from './MyAccountStack';
import { MyContentStack } from './MyContentStack';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const DrawerMenuButton = () => {
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

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Home Screen2'
      drawerPosition='left'
      drawerType='back'
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: colors.white,
          height: 450,
          width: 250,
          borderRadius: 16,
          marginTop: 30
        },
        drawerActiveTintColor: colors.green,
        drawerInactiveTintColor: colors.black
      }}
      drawerContent={(props) => <CloseDrawerMenu {...props} />}
    >
      <Drawer.Screen
        name='Home Screen2'
        component={BottomTab}
        options={{
          drawerLabel: 'Home',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <Octicons name='home' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
      />
      <Drawer.Screen
        name='New Quiz Screen2'
        component={BottomTab}
        options={{
          drawerLabel: 'Create New Quiz',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <AntDesign name='pluscircleo' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
        initialParams={{ screen: 'New Quiz Stack' }}
      />
      <Drawer.Screen
        name='My Content Screen2'
        component={BottomTab}
        options={{
          drawerLabel: 'My Content',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <Feather name='folder' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
      />
      <Drawer.Screen
        name='SaveDocumentsScreen'
        component={BottomTab}
        options={{
          drawerLabel: 'Saved Documents',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <Ionicons name='document-text-outline' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
      />
      <Drawer.Screen
        name='MyAccount'
        component={BottomTab}
        options={{
          drawerLabel: 'My Account',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <FontAwesome5 name='user-circle' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
      />
      <Drawer.Screen
        name='SettingsScreen'
        component={BottomTab}
        options={{
          drawerLabel: 'Settings',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <Feather name='settings' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
      />
    </Drawer.Navigator>
  );
};

export const BottomTab = () => {
  const bottonIconColor = '#979797';
  return (
    <Tab.Navigator
      initialRouteName='Home Screen'
      activeColor={colors.green}
      inactiveColor={bottonIconColor}
      barStyle={{ backgroundColor: '#F4F4F4' }}
      labeled={true}
      sceneAnimationEnabled={true}
    >
      <Tab.Screen
        name='Progress Screen2'
        component={ProgressScreen}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color }) => (
            <Octicons name='graph' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='New Quiz Stack'
        component={MyQuizStack}
        options={{
          tabBarLabel: 'New Quiz',
          tabBarIcon: ({ color }) => (
            <AntDesign name='pluscircleo' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Home Screen'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Octicons name='home' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Review'
        component={MyContentStack}
        options={{
          tabBarLabel: 'Review',
          tabBarIcon: ({ color }) => (
            <Feather name='book-open' color={color} size={26} />
          )
        }}
        initialParams={{ screen: 'My Review Screen' }}
      />
      <Tab.Screen
        name='Account'
        component={MyAccountStack}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='user' color={color} size={26} />
          )
        }}
        initialParams={{ screen: 'MyAccountScreen' }}
      />
    </Tab.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerShown: false,
        cardStyle: { backgroundColor: colors.white }
      }}
    >
      <Stack.Screen name='Drawer Menu' component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

const localStyles = StyleSheet.create({
  DrawMenuButton: {
    marginLeft: 10,
    marginTop: 10
  }
});
