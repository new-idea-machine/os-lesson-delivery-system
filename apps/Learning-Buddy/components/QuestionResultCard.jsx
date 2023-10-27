import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { colors } from '../config/colors';
import AnswerButton from './AnswerButton';

const QuestionResultCard = ({ questionData }) => {
  return (
    <Card mode='contained' style={{ backgroundColor: 'white' }}>
      <Card.Title
        title={`Question ${questionData.questionNumber}`}
        titleStyle={localStyles.titleStyle}
      />
      <Card.Content>
        <View style={{ marginVertical: 20 }}>
          <Text>{questionData.prompt}</Text>
        </View>
        {questionData.shuffledArray.map((item, index) => {
          const isUserCorrect =
            questionData.chosenAnswer === questionData.correct;
          const isChosenAnswer = item === questionData.chosenAnswer;
          const isCorrectAnswer = item === questionData.correct;

          return (
            <AnswerButton
              key={index}
              isChosenAnswer={isChosenAnswer}
              isCorrectAnswer={isCorrectAnswer}
              content={`${String.fromCharCode(65 + index)}. ${item}`}
              onPress={() => {}}
            />
          );
        })}
      </Card.Content>
    </Card>
  );
};

export default QuestionResultCard;

const localStyles = StyleSheet.create({
  titleStyle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    letterSpacing: 1,
    color: colors.green,
    fontWeight: '600',
    lineHeight: 24,
    height: 24
  }
});
