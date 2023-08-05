import {
  Icon,
  View,
  Pressable,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, ProgressBar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

import BigButton from '../components/BigButton';
import AnswerButton from '../components/AnswerButton';
import { colors } from '../config/colors';

export const QuizResultDetailScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [questionData, setQuestionData] = useState({
    totalQuestions: 1,
    questionNumber: 1,
    correct: '',
    prompt: '',
    shuffledArray: []
  });

  useEffect(() => {
    setQuestionData(route.params);
  }, []);

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
            <Text style={localStyles.pageTitle}>Quiz Topic</Text>
          </View>
          <View
            style={{
              flex: 1,
              marginVertical: 10
            }}
          >
            <ProgressBar
              progress={
                questionData.questionNumber / questionData.totalQuestions || 1
              }
              color={colors.grey}
              style={{
                borderRadius: 25,
                height: 10
              }}
            />
          </View>
          <View style={{ marginVertical: 30 }}>
            <Card mode='contained' style={{ backgroundColor: 'white' }}>
              <Card.Title
                title={`Question ${questionData.questionNumber}`}
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
              />
              <Card.Content>
                <View style={{ marginVertical: 20 }}>
                  <Text>{questionData.prompt}</Text>
                </View>
                {questionData.shuffledArray.map((item, index) => {
                  const isUserCorrect =
                    questionData.chosenAnswer === questionData.correct;
                  const isChosenAnswer = item === questionData.chosenAnswer;

                  let buttonColor = colors.lightGrey;

                  if (isChosenAnswer) {
                    buttonColor = isUserCorrect ? colors.lightBlue : colors.red;
                  }

                  return (
                    <AnswerButton
                      key={index}
                      buttonColor={buttonColor}
                      textColor={colors.black}
                      content={item}
                      onPress={() => {}}
                    />
                  );
                })}
              </Card.Content>
            </Card>
          </View>
          <View style={{ marginVertical: 10 }}>
            {/* <Pressable
              style={{
                display: 'flex',
                alignSelf: 'flex-end',
                marginRight: 60,
                marginVertical: 30,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onPress={() => {}}
            >
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  fontSize: 12
                }}
              >
                Next
              </Text>
              <Feather name='chevron-right' size={24} color={colors.black} />
            </Pressable> */}
            <BigButton
              buttonColor={colors.green}
              textColor={colors.black}
              content={'GO BACK'}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
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
