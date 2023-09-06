import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { colors } from '../config/colors';

// Create a stack navigator
const HomeStack = createStackNavigator();

// Define a component for the content stack
export const MyHomeStack = ({ route }) => {
  // Set the initial screen based on the route parameter, default to 'My Content Screen'
  const initialScreen = route.params?.screen || 'My Home Screen';
  // Return the navigator component
  return (
    <HomeStack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        cardStyle: { backgroundColor: colors.white }
      }}
    >
      <HomeStack.Screen name='My Home Screen' component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
