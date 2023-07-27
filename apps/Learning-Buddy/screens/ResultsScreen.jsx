import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export const ResultsScreen = ({ route }) => {
  const answerData = route.params;

  const formEvaluation = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let total = answerData.length;

    answerData.map((question) => {
      if (question.chosenAnswer === question.options.Correct) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    return (
      <>
        <Text>{`You got ${correctCount} correct`}</Text>
        <Text>{`You got ${incorrectCount} incorrect`}</Text>
        <Text>
          {`You got ${correctCount} / ${total}. or ${Math.round(
            (correctCount / total) * 100
          )}%`}
        </Text>
      </>
    );
  };

  return <View style={localStyles.container}>{formEvaluation()}</View>;
};

const localStyles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
