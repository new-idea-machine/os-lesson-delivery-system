import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../config/colors';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import BigButton from '../components/BigButton';
import SampleTestData from '../data/SampleTestData.json';
import QuestionRadioGroup from '../components/QuestionRadioGroup';

export const AnsweringScreen = () => {
  const styles = useContext(StyleSheetContext);

  // boolean indicating all questions have been answered
  const [notAllQuestionsAnswered, setNotAllQuestionsAnswered] = useState(true);

  // final data to send to the next page
  const [answerData, setAnswerData] = useState(SampleTestData);

  // check if all questions have been answered in the test allowing submission
  function verifyAllAnswered() {
    let check = false;

    answerData.questions.map((question) => {
      if (question.answer === '') {
        // a question has not been answered return true
        check = true;
        return;
      }
    });

    if (check) {
      setNotAllQuestionsAnswered(true);
    } else {
      setNotAllQuestionsAnswered(false);
    }
  }

  // after radio button has been pressed save the answer the user chose
  function UpdateGivenAnswers(question, newAnswer, array) {
    // This object will be modified with the new answer given
    let newAnswerData = answerData;

    // find index to modify
    const objIndex = answerData.questions.findIndex(
      (obj) => obj.prompt === question.prompt
    );

    // set the value of the array answers were printed in
    newAnswerData.questions[objIndex].answer = newAnswer;
    newAnswerData.questions[objIndex].array = array;

    verifyAllAnswered();
    // save new data
    setAnswerData(newAnswerData);
  }

  return (
    <SafeAreaView style={localStyles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>SAMPLE TEST</Text>
        {/* Render Question */}

        {SampleTestData.questions.map((question, index) => {
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
          disabled={notAllQuestionsAnswered}
          buttonColor={colors.green}
          textColor={colors.black}
          content={'Submit'}
          onPress={() => {
            // TODO: send to next page
            console.log(answerData);
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
