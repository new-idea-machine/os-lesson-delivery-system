import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, ProgressBar } from 'react-native-paper';

import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const QuizResultScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const answerData = route.params;

  const quizGrade = () => {
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
    return { correctCount, total };
  };
  const { correctCount, total } = quizGrade();

  const onPressHandler = async () => {};

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
                fontSize: 22
              }}
            >
              {correctCount}/{total}
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
                  progress={Math.round(correctCount / total)}
                  color={colors.lightOrange}
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
            {answerData.map((item, index) => (
              <Card
                onPress={() => {}}
                mode='elevated'
                style={{ borderRadius: 1 }}
                key={index}
              >
                <Card.Title title={item.prompt} />
                <Card.Content>
                  <Text
                    style={{
                      color:
                        item.options.Correct === item.chosenAnswer
                          ? colors.lightBlue
                          : colors.red
                    }}
                  >
                    {item.chosenAnswer}
                  </Text>
                </Card.Content>
              </Card>
            ))}
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
              onPress={() => navigation.navigate('Home Screen')}
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
