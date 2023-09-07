import { createStackNavigator } from '@react-navigation/stack';

import { MyAccountScreen } from '../screens/MyAccountScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

import { colors } from '../config/colors';

// Create a stack navigator
const AccountStack = createStackNavigator();

// Define a component for the account stack
export const MyAccountStack = ({ route }) => {
  // Set the initial screen based on the route parameter, default to 'My Settings Screen'
  const initialScreen = route.params?.screen || 'My Settings Screen';
  // Return the navigator component
  return (
    <AccountStack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        cardStyle: { backgroundColor: colors.white }
      }}
    >
      <AccountStack.Screen
        name='My Settings Screen'
        component={SettingsScreen}
      />
      <AccountStack.Screen
        name='My Account Screen'
        component={MyAccountScreen}
      />
    </AccountStack.Navigator>
  );
};
