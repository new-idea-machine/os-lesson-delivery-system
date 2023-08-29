import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../config/colors';
import { NewQuizScreen } from '../screens/NewQuizScreen';
import { AnsweringScreen } from '../screens/AnsweringScreen';
import { QuizResultScreen } from '../screens/QuizResultScreen';
import { QuizResultDetailScreen } from '../screens/QuizResultDetailScreen';
import { QuestionForm } from '../screens/QuestionForm';

const QuizStack = createStackNavigator();

export const MyQuizStack = () => {
  return (
    <QuizStack.Navigator
      initialRouteName='New Quiz Screen'
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        cardStyle: { backgroundColor: colors.white }
        // headerLeft: () => <DrawerMenuButton />
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
        name='QuizResultDetailScreen'
        component={QuizResultDetailScreen}
      />
    </QuizStack.Navigator>
  );
};
