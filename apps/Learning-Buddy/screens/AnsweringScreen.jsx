import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../config/colors';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import BigButton from '../components/BigButton';
import QuestionRadioGroup from '../components/QuestionRadioGroup';
import { useNavigation } from '@react-navigation/native';

export const AnsweringScreen = ({ route }) => {
  const styles = useContext(StyleSheetContext);
  const navigation = useNavigation();

  const [questionsAnswered, setQuestionsAnswered] = useState(false); // boolean indicating all questions have been answered
  const [answerData, setAnswerData] = useState([]); // final data to send to the next page

  // check if all questions have been answered in the test allowing submission
  const verifyQuestionsAnswered = () => {
    // function to check if all answers have not been chosen yet
    const allQuestionsAnswered = (question) =>
      question.chosenAnswer !== undefined;

    setQuestionsAnswered(answerData.every(allQuestionsAnswered));
  };

  // after radio button has been pressed save the answer the user chose
  const UpdateGivenAnswers = (question, newAnswer, array) => {
    // This object will be modified with the new answer given
    let newAnswerData = answerData;

    // find index to modify
    const objIndex = answerData.findIndex(
      (obj) => obj.prompt === question.prompt
    );

    // set the value of the array answers were printed in
    newAnswerData[objIndex].chosenAnswer = newAnswer;
    newAnswerData[objIndex].shuffledArray = array;

    verifyQuestionsAnswered();
    // save new data
    setAnswerData(newAnswerData);
  };

  const SubmitTest = () => {
    navigation.navigate('Quiz Result Screen', answerData);
    // navigation.navigate('Results Screen', answerData);
  };

  useEffect(() => {
    // question list on load
    setAnswerData(route.params.questions || []);
  }, []);

  return (
    <SafeAreaView style={localStyles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>SAMPLE TEST</Text>
        {/* Render Question */}
        {answerData.map((question, index) => {
          return (
            <View style={localStyles.card} key={index}>
              {/* Question Prompt */}
              <Text>Question {index + 1}</Text>
              <Text>{question.prompt}</Text>

              {/* Render question radio button inputs */}
              <QuestionRadioGroup
                question={question}
                UpdateGivenAnswers={UpdateGivenAnswers}
              />
            </View>
          );
        })}
      </ScrollView>

      {/* Submit Button */}
      <View style={localStyles.footer}>
        <BigButton
          disabled={!questionsAnswered}
          buttonColor={colors.green}
          textColor={colors.black}
          content={'Submit'}
          onPress={() => {
            SubmitTest();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    minWidth: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#d6d6d6',
    paddingHorizontal: 10,
    marginVertical: 5
  },
  footer: {
    paddingTop: 20
  },
  card: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.lightGrey
  }
});
