import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const QuizResultScreen = ({ route, navigation }) => {
  // Get safe area insets
  const insets = useSafeAreaInsets();

  // Extract answer data from the route params
  const answerData = route.params;

  // Define a function to calculate the quiz grade
  // Define a function to calculate the quiz grade
  const quizGrade = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let total = answerData.length;

    // Loop through the answer data
    answerData.forEach((question) => {
      if (question.chosenAnswer === question.options.Correct) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });
    return { correctCount, total };
  };
  // Calculate the quiz grade
  const { correctCount, total } = quizGrade();

  // Define a function to handle card press
  const handleCardPress = (question) => {
    navigation.navigate('Quiz Result Detail Screen', question);
  };

  // Define a function to get the index letter for a question
  // Define a function to get the index letter for a question
  function getIndexLetter(question) {
    const index = question.shuffledArray.indexOf(question.chosenAnswer);
    return String.fromCharCode(65 + index);
  }

  // Define an onPressHandler function (empty for now)
  const onPressHandler = async () => {
    // Retake Quiz Implementation will be added later
  };

  return (
    <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 35 }}>
          <View>
            <Text style={localStyles.pageTitle}>Quiz Result</Text>
          </View>
          <Text style={localStyles.title}>Your Grade is:</Text>
          <View>
            <Text
              style={{
                color: colors.lightOrange,
                fontFamily: 'Poppins',
                fontWeight: '900',
                fontSize: 27
              }}
            >
              {Math.round((correctCount / total) * 100)} / 100
            </Text>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: 12,
                color: colors.grey
              }}
            >
              Your Overall Accuracy Rate
            </Text>
            <View
              style={{
                flex: 1,
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'space-between'
              }}
            >
              <View
                style={{
                  flex: 1
                }}
              >
                <ProgressBar
                  progress={correctCount / total}
                  color={colors.lightYellow}
                  style={{
                    borderRadius: 25,
                    height: 10
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 10
                }}
              >
                <Text>{Math.round((correctCount / total) * 100)}%</Text>
              </View>
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Card
              mode='contained'
              style={{
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: 'transparent',
                letterSpacing: 1
              }}
            >
              {answerData.map((item, index) => (
                <Card
                  onPress={() =>
                    handleCardPress({
                      prompt: item.prompt,
                      shuffledArray: item.shuffledArray,
                      correct: item.options.Correct,
                      incorrect: item.options.Incorrect,
                      chosenAnswer: item.chosenAnswer,
                      questionNumber: index + 1, // add one since question indexes dont start from 0
                      totalQuestions: answerData.length
                    })
                  }
                  mode='contained'
                  style={{
                    borderRadius: 0,
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1
                  }}
                  key={index}
                >
                  <Card.Title title={`${index + 1}. ${item.prompt}`} />
                  <Card.Content>
                    <Text
                      style={{
                        color:
                          item.options.Correct === item.chosenAnswer
                            ? colors.lightBlue
                            : colors.red,
                        fontWeight: 'bold'
                      }}
                    >
                      {`${getIndexLetter(item)}. ${item.chosenAnswer}`}
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </Card>
          </View>
          <View style={{ marginVertical: 10 }}>
            <BigButton
              buttonColor={colors.green}
              textColor={colors.black}
              content={'RETAKE THIS QUIZ'}
              onPress={onPressHandler}
              disabled={true}
            />
            <BigButton
              buttonColor={colors.green}
              textColor={colors.black}
              content={'GO TO HOME SCREEN'}
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'Home Stack',
                  params: { screen: 'My Home Screen' }
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  iconButton: {
    width: 265,
    height: 55,
    borderRadius: 30,
    marginVertical: 10
  },
  card: {
    flex: 1,
    textColor: colors.black,
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    marginBottom: 10
  },
  pageTitle: {
    marginTop: 20,
    marginBottom: 10,
    color: colors.black,
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 27,
    alignSelf: 'flex-start'
  },
  title: {
    color: colors.black,
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10
  }
});
