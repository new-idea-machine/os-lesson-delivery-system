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
import { ProgressScreen } from '../screens/ProgressScreen';
import { CloseDrawerMenu } from '../components/CloseDrawerMenu';

import { MyHomeStack } from './MyHomeStack';
import { MyQuizStack } from './MyQuizStack';
import { MyAccountStack } from './MyAccountStack';
import { MyContentStack } from './MyContentStack';

// Create tab, drawer, and stack navigators
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Custom drawer menu button component
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

// Drawer navigator containing main app screens
export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
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
        name='Home'
        component={BottomTab}
        options={{
          drawerLabel: 'Home',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <Octicons name='home' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
        initialParams={{
          screen: 'Home Screen',
          params: { screen: 'My Home Screen' }
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
        initialParams={{
          screen: 'New Quiz Stack',
          params: { screen: 'New Quiz Screen' }
        }}
      />
      <Drawer.Screen
        name='My Content'
        component={BottomTab}
        options={{
          drawerLabel: 'My Content',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <Feather name='folder' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
        initialParams={{
          screen: 'Review',
          params: { screen: 'My Content Screen' }
        }}
      />
      <Drawer.Screen
        name='Save Documents'
        component={BottomTab}
        options={{
          drawerLabel: 'Saved Documents',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <Ionicons name='document-text-outline' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
        initialParams={{
          screen: 'Review',
          params: { screen: 'My Save Documents' }
        }}
      />
      <Drawer.Screen
        name='My Account'
        component={BottomTab}
        options={{
          drawerLabel: 'My Account',
          headerTitle: '',
          drawerIcon: ({ color }) => (
            <FontAwesome5 name='user-circle' size={24} color={color} />
          ),
          headerLeft: () => <DrawerMenuButton />
        }}
        initialParams={{ screen: 'Account Stack' }}
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
        initialParams={{
          screen: 'Account Stack',
          params: { screen: 'My Settings Screen' }
        }}
      />
    </Drawer.Navigator>
  );
};

// Bottom tab navigator for each drawer screen
export const BottomTab = ({ route }) => {
  const bottonIconColor = '#979797';
  const initialTab = route.params?.screen || 'Home Screen';
  return (
    <Tab.Navigator
      initialRouteName={initialTab}
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
        initialParams={('New Quiz', { screen: 'New Quiz Screen' })}
      />
      <Tab.Screen
        name='Home Screen'
        component={MyHomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Octicons name='home' color={color} size={26} />
          )
        }}
        initialParams={('Home', { screen: 'My Home Screen' })}
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
        initialParams={('Content', { screen: 'My Review Screen' })}
      />
      <Tab.Screen
        name='Account Stack'
        component={MyAccountStack}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='user' color={color} size={26} />
          )
        }}
        initialParams={('Account', { screen: 'My Account Screen' })}
      />
    </Tab.Navigator>
  );
};

// Top level app stack with drawer
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
