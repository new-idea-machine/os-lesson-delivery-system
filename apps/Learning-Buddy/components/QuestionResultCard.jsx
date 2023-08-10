import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import AnswerButton from './AnswerButton';
import { colors } from '../config/colors';

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

          let textColor, borderColor;

          if (isCorrectAnswer) {
            textColor = colors.lightBlue;
            borderColor = colors.lightBlue;
          } else if (isChosenAnswer && !isUserCorrect) {
            textColor = colors.red;
            borderColor = colors.red;
          } else {
            textColor = colors.black;
            borderColor = colors.black;
          }

          return (
            <AnswerButton
              key={index}
              textColor={textColor}
              style={[localStyles.button, { borderColor: borderColor }]}
              content={item}
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
  },
  button: {
    width: 265,
    height: 55,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 5,
    marginVertical: 10
  }
});
