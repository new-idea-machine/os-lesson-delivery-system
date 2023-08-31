import { createStackNavigator } from '@react-navigation/stack';

import { ReviewScreen } from '../screens/ReviewScreen';
import { MyContentScreen } from '../screens/MyContentScreen';
import { SaveDocumentsScreen } from '../screens/SaveDocumentsScreen';
import { colors } from '../config/colors';

// Create a stack navigator
const ContentStack = createStackNavigator();

// Define a component for the content stack
export const MyContentStack = ({ route }) => {
  // Set the initial screen based on the route parameter, default to 'My Content Screen'
  const initialScreen = route.params?.screen || 'My Content Screen';
  // Return the navigator component
  return (
    <ContentStack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        cardStyle: { backgroundColor: colors.white }
      }}
    >
      <ContentStack.Screen name='My Review Screen' component={ReviewScreen} />
      <ContentStack.Screen
        name='My Content Screen'
        component={MyContentScreen}
      />
      <ContentStack.Screen
        name='My Save Documents'
        component={SaveDocumentsScreen}
      />
    </ContentStack.Navigator>
  );
};
