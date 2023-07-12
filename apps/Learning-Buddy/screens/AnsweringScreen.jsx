import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { colors } from '../config/colors';
import BigButton from '../components/BigButton';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import SampleTestData from '../data/SampleTestData.json';
import QuestionRadioGroup from '../components/QuestionRadioGroup';
import { RadioButton } from 'react-native-paper';

export const AnsweringScreen = () => {
  const styles = useContext(StyleSheetContext);
  // const [questionData, setQuestionData] = useState(SampleTestData);
  const [answerData, setAnswerData] = useState({})

  function UpdateGivenAnswers(question, newAnswer, array) {
    // TODO: What happens after you send the data
    console.log(`QUESTION: ${question.prompt} \n ANSWER GIVEN: ${newAnswer} \n ARRAY WAS: ${array}`);
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
          buttonColor={colors.green}
          textColor={colors.black}
          content={'Submit'}
          onPress={() => {}}
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
