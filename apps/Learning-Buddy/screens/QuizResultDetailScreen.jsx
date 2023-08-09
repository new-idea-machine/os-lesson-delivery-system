import { View, Pressable, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressBar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

import BigButton from '../components/BigButton';
import QuestionResultCard from '../components/QuestionResultCard';
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

  const onNextPress = () => {};
  const onPrevPress = () => {};

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
            <QuestionResultCard questionData={questionData} />
          </View>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Pressable
              onPress={onPrevPress}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text>
                <Feather name='chevron-left' size={15} color={colors.black} />
                Previous
              </Text>
            </Pressable>
            <Pressable
              onPress={onNextPress}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text>
                Next
                <Feather name='chevron-right' size={15} color={colors.black} />
              </Text>
            </Pressable>
          </View>
          <View style={{ marginVertical: 10 }}>
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
