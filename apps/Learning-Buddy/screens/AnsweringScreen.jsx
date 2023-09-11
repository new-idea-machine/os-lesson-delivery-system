import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../config/colors';
import { Pressable } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import BigButton from '../components/BigButton';
import QuestionRadioGroup from '../components/QuestionRadioGroup';

export const AnsweringScreen = ({ route, navigation }) => {
  const [questionsAnswered, setQuestionsAnswered] = useState(false); // boolean indicating all questions have been answered
  const [answerData, setAnswerData] = useState([]); // final data to send to the next page
  const [qIndex, setQIndex] = useState(0);

  // check if all questions have been answered in the test allowing submission
  const verifyQuestionsAnswered = () => {
    // function to check if all answers have not been chosen yet
    const allQuestionsAnswered = (question) =>
      question.chosenAnswer !== undefined;

    setQuestionsAnswered(answerData.every(allQuestionsAnswered));
  };

  // Simple function that finds current selected answer for current question
  const FindCurrentChosenAnswer = (findPrompt) => {
    // find index to modify
    const objIndex = answerData.findIndex(
      (obj) => obj.prompt === findPrompt
    );

    return answerData[objIndex].chosenAnswer;
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
    <SafeAreaView style={localStyles.wrapper}>
      <ScrollView>
        <View style={localStyles.container}>
          <Text style={localStyles.questionTitle}>Sample Test ii</Text>
          <ProgressBar
            progress={
              answerData.length !== 0
                ? (qIndex + 1) / answerData.length
                : qIndex
            }
            color={colors.lightYellow}
            style={localStyles.progressBar}
          />

          {answerData.length > 0 && (
            <View>
              {/* Question Prompt */}
              <Text style={localStyles.questionNumber}>
                Question {qIndex + 1}
              </Text>
              <Text style={localStyles.questionPrompt}>
                {answerData[qIndex].prompt}
              </Text>

              {/* Render question radio button inputs */}
              <QuestionRadioGroup
                question={answerData[qIndex]}
                UpdateGivenAnswers={UpdateGivenAnswers}
                FindCurrentChosenAnswer={FindCurrentChosenAnswer}
              />
            </View>
          )}
          <View>
            <Pressable
              onPress={() => {
                if (qIndex !== 0) {
                  setQIndex((previous) => previous - 1);
                }
              }}
            >
              <Text style={localStyles.previous}>{'<'} Previous</Text>
            </Pressable>
          </View>
        </View>

        {/* Submit Button */}
        <View style={{ marginVertical: 10 }}>
          {qIndex !== answerData.length - 1 ? (
            <BigButton
              buttonColor={colors.green}
              textColor={colors.black}
              content={'NEXT'}
              onPress={() => {
                setQIndex((previous) => previous + 1);
              }}
            />
          ) : (
            <BigButton
              disabled={!questionsAnswered}
              buttonColor={colors.green}
              textColor={colors.black}
              content={'SUBMIT'}
              onPress={() => {
                SubmitTest();
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginHorizontal: 60,
    padding: 5
  },
  questionTitle: {
    color: colors.yellow,
    fontFamily: 'Black',
    letterSpacing: 3,
    fontSize: 18
  },
  questionNumber: {
    color: '#B1B1B1',
    fontFamily: 'SemiBold',
    letterSpacing: 2,
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10
  },
  questionPrompt: {
    fontFamily: 'Poppins',
    letterSpacing: 1,
    fontSize: 12,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 5
  },
  progressBar: {
    borderRadius: 25,
    height: 10,
    marginVertical: 20
  },
  previous: {
    fontFamily: 'Poppins',
    letterSpacing: 1,
    fontSize: 12,
    marginHorizontal: 40,
    marginTop: 5,
    color: colors.grey
  }
});
