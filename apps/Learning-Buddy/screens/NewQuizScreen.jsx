import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  Card,
  IconButton,
  Divider,
  Paragraph,
  TextInput
} from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants';

import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const NewQuizScreen = () => {
  const ip = Constants.expoConfig.extra.IP;

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [text, setText] = useState('');

  // const [numLines, changeNumLines] = useState(1);

  // useEffect(() => {
  //   const charLen = text.length;
  //   const suggestLines = Math.ceil(charLen / 50);
  //   suggestLines > 0 ? changeNumLines(suggestLines) : changeNumLines(1);
  // }, [text]);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type === 'success') {
      let file = {
        name: result.name,
        uri: result.uri,
        type: result.mimeType
      };

      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch(`http://${ip}:8000/extract/file`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        setText(data.text);
        console.log(text);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [numQuestions, setNumQuestions] = useState(1);

  const handleIncrement = () => {
    if (numQuestions < 6) {
      setNumQuestions(numQuestions + 1);
    }
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

  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleDifficultyPress = (difficultyContent) => {
    setSelectedDifficulty(difficultyContent);
  };

  const [response, setResponse] = useState('');

  const getQuestions = async () => {
    setResponse(null);
    const reqQuestion = `Ask me ${numQuestions} questions, multiple choice with four different potential answers, based only on this information: 
    ${text}. Indicate which is the correct response, and Return your response in a JSON object, with the following format: {"questions": [{"question1": "", "options": {"Correct": "", "Incorrect": ["", "", ""]}},...]}`;
    let source = { id: 1, question: reqQuestion };
    source = JSON.stringify(source);

    try {
      const response = await fetch(`http://${ip}:8000/questions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // mode: 'no-cors',
        body: source
      });
      const json = await response.json();
      const questions = json.response.choices[0].text;

      console.log(
        '🪵 ---------------------------------------------------------------------🪵'
      );
      console.log(
        '🪵 ~ file: NewQuizScreen.jsx:77 ~ getQuestions ~ questions:',
        questions
      );
      console.log(
        '🪵 ---------------------------------------------------------------------🪵'
      );

      return questions;
    } catch (error) {
      console.error(error);
      setResponse('oh no, problem');
    }
  };

  // When question is pass to the next screen
  const onPressHandler = async () => {
    const passingQuestions = await getQuestions();
    navigation.navigate('Home Screen');
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
              underlineColor={colors.white}
              activeUnderlineColor={colors.white}
              style={localStyles.input}
              label='Enter text'
              onChangeText={(text) => setText(text)}
              value={text}
              multiline
              numberOfLines={30}
              // numberOfLines={numLines}
            />
            {/* <View style={localStyles.buttonContainer}>
              <BigButton
                buttonColor={colors.grey}
                textColor={colors.black}
                content={'Paste'}
                onPress={() => {}}
              />
            </View> */}
          </View>
          <BigButton
            buttonColor={colors.white}
            textColor={colors.black}
            content={'Upload File'}
            onPress={pickDocument}
          />
          <View style={localStyles.divider}>
            <Divider />
          </View>
          <View>
            <Text style={localStyles.title}>Number Of Questions</Text>
            <View style={localStyles.container}>
              <IconButton
                icon='chevron-up'
                size={34}
                iconColor={colors.white}
                mode='contained'
                style={localStyles.iconButton}
                containerColor={colors.aqua}
                onPress={handleIncrement}
              />
              <TextInput
                editable={false}
                underlineColor={colors.white}
                activeUnderlineColor={colors.white}
                style={{
                  textAlign: 'center',
                  width: 158,
                  height: 60,
                  borderBottomEndRadius: 15,
                  borderBottomStartRadius: 15,
                  borderTopStartRadius: 15,
                  borderTopEndRadius: 15,
                  fontFamily: 'Poppins',
                  fontWeight: '600',
                  fontSize: 20,
                  backgroundColor: colors.lightGrey
                }}
                value={numQuestions.toString()}
                onChangeText={(text) => setNumQuestions(parseInt(text))}
                keyboardType='numeric'
              />
              <IconButton
                icon='chevron-down'
                size={34}
                iconColor={colors.white}
                mode='contained'
                style={localStyles.iconButton}
                containerColor={colors.aqua}
                onPress={handleDecrement}
              />
            </View>
          </View>
          {/* <View>
            <Text style={localStyles.title}>Question Types</Text>
            <View style={localStyles.container}>
              <BigButton
                buttonColor={
                  selectedQuestionType === 'Multiple Choice'
                    ? colors.grey
                    : colors.lightGrey
                }
                textColor={
                  selectedQuestionType === 'Multiple Choice'
                    ? colors.white
                    : colors.black
                }
                content={'Multiple Choice'}
                onPress={() => handleQuestionTypePress('Multiple Choice')}
              />
              <BigButton
                buttonColor={
                  selectedQuestionType === 'True/False'
                    ? colors.grey
                    : colors.lightGrey
                }
                textColor={
                  selectedQuestionType === 'True/False'
                    ? colors.white
                    : colors.black
                }
                content={'True/False'}
                onPress={() => handleQuestionTypePress('True/False')}
              />
            </View>
          </View> */}
          {/* <View>
            <Text style={localStyles.title}>Difficulty Level</Text>
            <View style={localStyles.container}>
              <BigButton
                buttonColor={
                  selectedDifficulty === 'Beginner'
                    ? colors.grey
                    : colors.lightGrey
                }
                textColor={
                  selectedDifficulty === 'Beginner'
                    ? colors.white
                    : colors.black
                }
                content={'Beginner'}
                onPress={() => handleDifficultyPress('Beginner')}
              />
              <BigButton
                buttonColor={
                  selectedDifficulty === 'Intermediate'
                    ? colors.grey
                    : colors.lightGrey
                }
                textColor={
                  selectedDifficulty === 'Intermediate'
                    ? colors.white
                    : colors.black
                }
                content={'Intermediate'}
                onPress={() => handleDifficultyPress('Intermediate')}
                disabled={true}
              />
              <BigButton
                buttonColor={
                  selectedDifficulty === 'Advanced'
                    ? colors.grey
                    : colors.lightGrey
                }
                textColor={
                  selectedDifficulty === 'Advanced'
                    ? colors.white
                    : colors.black
                }
                content={'Advanced'}
                onPress={() => handleDifficultyPress('Advanced')}
                disabled={true}
              />
            </View>
          </View> */}
          {/* <View>
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
          </View> */}
          <View style={localStyles.divider}>
            <Divider />
          </View>
          <View style={{ alignItems: 'center' }}>
            <BigButton
              buttonColor={colors.green}
              textColor={colors.black}
              content={'Next'}
              onPress={onPressHandler}
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
  container: {
    flex: 1,
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
  divider: { marginVertical: 10 },
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
  },
  input: {
    width: '100%',
    height: 300,
    margin: 10,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: colors.lightGrey
  }
});
