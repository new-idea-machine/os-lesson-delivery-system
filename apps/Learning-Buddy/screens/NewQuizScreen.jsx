import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
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
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';
import { AuthContext } from '../providers/AuthProvider';
import { getMultipleChoice } from '../util/api';
import Constants from 'expo-constants';

const ip = Constants.expoConfig.extra.IP;

export const NewQuizScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [numQuestions, setNumQuestions] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(0);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [upDisabled, setUpDisabled] = useState(true);
  const [downDisabled, setDownDisabled] = useState(true);
  const [characters, setCharacters] = useState('0');
  const [remaining, setRemaining] = useState(0);

  const auth = useContext(AuthContext);
  const { session } = auth;
  console.log('token:', session.access_token);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: [
        'image/*',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
    });

    if (result.type === 'success') {
      let file = {
        name: result.name,
        uri: result.uri,
        type: result.mimeType
      };

      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch(`http://${ip}:8000/file/extract`, {
          method: 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${session.access_token}` }
        });
        const data = await response.json();
        console.log(data);
        if (data == null || data.text == null || data.text == '') {
          alert(
            'Unable to parse text from selected file.  Please try a different file.'
          );
        } else {
          setText(data.text);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const charLen = text.length;
    const max = Math.floor(charLen / 50);
    setMaxQuestions(max);
    setRemaining(50 - (charLen % 50));
    const stringedCharacters = charLen.toString();
    numQuestions < max ? setUpDisabled(false) : setUpDisabled(true);
    text && numQuestions == 1 ? setDownDisabled(true) : setDownDisabled(false);
    charLen >= 50 && numQuestions == 0 ? setNumQuestions(1) : null;
    numQuestions > max ? setNumQuestions(max) : null;
    if (!text || charLen < 50) {
      setDownDisabled(true);
      setUpDisabled(true);
      setNumQuestions(0);
    }

    if (charLen < 50) {
      setCharacters(`${stringedCharacters}/50`);
    } else {
      setCharacters(stringedCharacters);
    }
  }, [text]);

  useEffect(() => {
    text && numQuestions < maxQuestions
      ? setUpDisabled(false)
      : setUpDisabled(true);
    text && numQuestions > 1 ? setDownDisabled(false) : setDownDisabled(true);
  }, [numQuestions]);

  const handleIncrement = () => {
    if (numQuestions < maxQuestions) {
      setNumQuestions(numQuestions + 1);
    }
  };

  const handleDecrement = () => {
    if (numQuestions > 1) {
      setNumQuestions(numQuestions - 1);
    }
  };

  const handleQuestionTypePress = (questionTypeContent) => {
    setSelectedQuestionType(questionTypeContent);
  };

  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleDifficultyPress = (difficultyContent) => {
    setSelectedDifficulty(difficultyContent);
  };

  // When question is pass to the next screen
  const onPressHandler = async () => {
    let passingQuestions = await getMultipleChoice(numQuestions, text);
    passingQuestions = JSON.parse(passingQuestions);
    navigation.navigate('Answering Screen', passingQuestions);
    setText('');
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
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={localStyles.container}>
          <View>
            <Text style={localStyles.pageTitle}>Create New Quiz</Text>
          </View>
          <Text style={localStyles.title}>Source Material</Text>
          <View style={localStyles.textInputContainer}>
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
            />
            <TextInput
              mode='flat'
              underlineColor={colors.white}
              activeUnderlineColor={colors.white}
              style={{
                paddingTop: 0,
                marginTop: -5,
                backgroundColor: colors.lightGrey,
                width: '100%',
                borderBottomEndRadius: 15,
                borderBottomStartRadius: 15,
                height: 25,
                textAlign: 'right',
                fontSize: 12
              }}
              value={characters}
            />
            {text && parseInt(characters, 10) < 50 ? (
              <Text>Please enter at least 50 characters to continue</Text>
            ) : null}
            {!text ? (
              <Text>Please enter some content to get started</Text>
            ) : null}
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
            <View style={localStyles.textInputContainer}>
              <IconButton
                icon='chevron-up'
                size={34}
                iconColor={colors.white}
                mode='contained'
                style={localStyles.iconButton}
                containerColor={colors.aqua}
                onPress={handleIncrement}
                disabled={upDisabled}
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
                value={`${numQuestions.toString()} / ${maxQuestions}`}
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
                disabled={downDisabled}
              />
              {maxQuestions && upDisabled ? (
                <Text style={{ textAlign: 'center' }}>
                  {/* Add more content to request more questions!{'\n'}  */}
                  {remaining} more characters required to unlock another
                  question.
                </Text>
              ) : null}
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
  container: {
    flex: 1,
    marginHorizontal: 35
  },
  iconButton: {
    width: 265,
    height: 55,
    borderRadius: 30,
    marginVertical: 10
  },
  textInputContainer: {
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
    height: 280,
    margin: 10,
    marginBottom: 0,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: colors.lightGrey
  }
});
