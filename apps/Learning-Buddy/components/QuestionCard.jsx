import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import AnswerButton from './AnswerButton';

const QuestionCard = ({
  numberOfOptions,
  options,
  title,
  subtitle,
  questionIndex,
  ...props
}) => {
  const currentQuestion = props.questions[questionIndex];
  const answerButtons = currentQuestion.options
    .slice(0, numberOfOptions)
    .map((option) => ({
      content: option,
      onPress: () => {}
    }));

  const answerButtonComponents = answerButtons.map((button, index) => (
    <AnswerButton
      key={index}
      buttonColor={colors.lightGrey}
      textColor={colors.black}
      content={button.content}
      onPress={button.onPress}
    />
  ));

  return (
    <Card mode='contained' style={{ backgroundColor: 'white' }}>
      <Card.Title
        title={title}
        subtitle={subtitle}
        titleStyle={{
          fontFamily: 'Poppins',
          fontSize: 16,
          letterSpacing: 1,
          color: colors.green,
          fontWeight: '600',
          lineHeight: 24,
          height: 24
        }}
        subtitleStyle={{
          fontFamily: 'Poppins',
          fontSize: 12,
          letterSpacing: 1,
          color: colors.black,
          fontWeight: '400',
          lineHeight: 18,
          height: 33,
          flexWrap: 'wrap'
        }}
        {...props}
      />
      <Card.Content>
        <View style={{ marginVertical: 20 }}>
          <Text>{currentQuestion.textContent}</Text>
        </View>
        <View>{answerButtonComponents}</View>
      </Card.Content>
    </Card>
  );
};

export default QuestionCard;
