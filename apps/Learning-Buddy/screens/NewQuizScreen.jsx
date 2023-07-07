import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Card,
  IconButton,
  Divider,
  Paragraph,
  TextInput
} from 'react-native-paper';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const NewQuizScreen = () => {
  const insets = useSafeAreaInsets();

  const [text, onChangeText] = useState('');
  const [numLines, changeNumLines] = useState(1);

  useEffect(() => {
    const charLen = text.length;
    const suggestLines = Math.ceil(charLen / 50);
    suggestLines > 0 ? changeNumLines(suggestLines) : changeNumLines(1);
  }, [text]);

  const [numQuestions, setNumQuestions] = useState(1);

  const handleIncrement = () => {
    setNumQuestions(numQuestions + 1);
  };

  const handleDecrement = () => {
    if (numQuestions > 1) {
      setNumQuestions(numQuestions - 1);
    }
  };

  const [selectedQuestionType, setSelectedQuestionType] = useState(null);

  const handleQuestionTypePress = (questionTypeContent) => {
    setSelectedQuestionType(questionTypeContent);
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
            <Text style={localStyles.pageTitle}>Create New Quiz</Text>
          </View>
          <Text style={localStyles.title}>Source Material</Text>
          <View style={localStyles.container}>
            <TextInput
              mode='flat'
              style={localStyles.input}
              label='Enter text'
              onChangeText={(text) => onChangeText(text)}
              value={text}
              multiline
              numberOfLines={numLines}
            />
            <View style={localStyles.buttonContainer}>
              <BigButton
                buttonColor={colors.grey}
                textColor={colors.black}
                content={'Paste'}
                onPress={() => {}}
              />
            </View>
          </View>
          <Divider />
          <View>
            <Text style={localStyles.title}>Number Of Questions</Text>
            <View style={localStyles.container}>
              <IconButton
                icon='chevron-up'
                mode='contained'
                containerColor={colors.lightBlue}
                iconColor={colors.black}
                onPress={handleIncrement}
              />
              <TextInput
                style={{
                  textAlign: 'center',
                  width: 158,
                  height: 60,
                  borderRadius: 15,
                  fontFamily: 'Poppins',
                  fontWeight: '600',
                  fontSize: 20,
                  backgroundColor: 'lightgrey'
                }}
                value={numQuestions.toString()}
                onChangeText={(text) => setNumQuestions(parseInt(text))}
                keyboardType='numeric'
              />
              <IconButton
                icon='chevron-down'
                mode='contained'
                containerColor={colors.lightBlue}
                iconColor={colors.black}
                onPress={handleDecrement}
              />
            </View>
          </View>

          <View>
            <Text style={localStyles.title}>Question Types</Text>
            <View style={localStyles.container}>
              <BigButton
                buttonColor={colors.lightGrey}
                textColor={
                  selectedQuestionType === 'Multiple Choice'
                    ? colors.white
                    : colors.black
                }
                content={'Multiple Choice'}
                onPress={() => handleQuestionTypePress('Multiple Choice')}
              />
              <BigButton
                buttonColor={colors.lightGrey}
                textColor={
                  selectedQuestionType === 'True/False'
                    ? colors.white
                    : colors.black
                }
                content={'True/False'}
                onPress={() => handleQuestionTypePress('True/False')}
              />
              <BigButton
                buttonColor={colors.lightGrey}
                textColor={
                  selectedQuestionType === 'Completion'
                    ? colors.white
                    : colors.black
                }
                content={'Completion'}
                onPress={() => handleQuestionTypePress('Completion')}
              />
              <BigButton
                buttonColor={colors.lightGrey}
                textColor={
                  selectedQuestionType === 'Matching'
                    ? colors.white
                    : colors.black
                }
                content={'Matching'}
                onPress={() => handleQuestionTypePress('Matching')}
              />
              <BigButton
                buttonColor={colors.lightGrey}
                textColor={
                  selectedQuestionType === 'Essays'
                    ? colors.white
                    : colors.black
                }
                content={'Essays'}
                onPress={() => handleQuestionTypePress('Essays')}
              />
            </View>
          </View>
          <View>
            <Text style={localStyles.title}>Diffculty Level</Text>
            <View style={localStyles.container}>
              <BigButton
                buttonColor={colors.lightGrey}
                textColor={colors.black}
                content={'Beginner'}
                onPress={() => {}}
              />
              <BigButton
                buttonColor={colors.lightGrey}
                textColor={colors.black}
                content={'Intermediate'}
                onPress={() => {}}
              />
              <BigButton
                buttonColor={colors.lightGrey}
                textColor={colors.black}
                content={'Advanced'}
                onPress={() => {}}
              />
            </View>
          </View>
          <View>
            <Text style={localStyles.title}>Your Goal Of Taking The Quiz</Text>
            <View style={localStyles.container}>
              <Card
                onPress={() => {}}
                mode='contained'
                style={localStyles.card}
              >
                <Card.Title title='Lorem Ipsum' />
                <Card.Content>
                  <Paragraph variant='bodyMedium'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Paragraph>
                </Card.Content>
              </Card>
              <Card
                onPress={() => {}}
                mode='contained'
                style={localStyles.card}
              >
                <Card.Title title='Lorem Ipsum Two' />
                <Card.Content>
                  <Paragraph variant='bodyMedium'>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </Paragraph>
                </Card.Content>
              </Card>
              <Card
                onPress={() => {}}
                mode='contained'
                style={localStyles.card}
              >
                <Card.Title title='Lorem Ipsum 3' />
                <Card.Content>
                  <Paragraph variant='bodyMedium'>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          </View>
          <Divider />
          <View style={{ alignItems: 'center' }}>
            <BigButton
              buttonColor={colors.green}
              textColor={colors.black}
              content={'Next'}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 5
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    paddingRight: 10
  },
  card: {
    flex: 1,
    textColor: colors.black,
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    marginBottom: 10
  },
  pageTitle: {
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
    marginTop: 30,
    marginBottom: 10
  },
  input: {
    width: '100%',
    height: 300,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: 'lightgrey'
  }
});
