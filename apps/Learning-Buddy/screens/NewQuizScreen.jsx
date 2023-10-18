import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider, IconButton, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';
import { AuthContext } from '../providers/AuthProvider';
import { createFile, extractText } from '../util/filesAPI';
import {
  getMixed,
  getMultipleChoice,
  getTrueFalse
} from '../util/quizGenerateAPI';

// Get IP from Expo Constants
const ip = Constants.expoConfig.extra.IP;

// Define the NewQuizScreen component
export const NewQuizScreen = ({ route, navigation }) => {
  const { textParam, fileId } = route.params || '';

  // Initialize state variables using React Hooks
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [numQuestions, setNumQuestions] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(0);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [upDisabled, setUpDisabled] = useState(true);
  const [downDisabled, setDownDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [characters, setCharacters] = useState('0');
  const [remaining, setRemaining] = useState(0);
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState(null);

  // Retrieve authentication context
  const auth = useContext(AuthContext);
  const { session } = auth;

  useEffect(() => {
    setText(textParam);
  }, [route]);

  // Function to handle document selection
  const pickDocument = async () => {
    // reset file state
    setHasFile(false);
    setFileName('');

    let result = await DocumentPicker.getDocumentAsync({
      type: [
        'image/*',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
    });

    console.log(result);
    if (result.assets) {
      result = result.assets[0];
      let file = {
        name: result.name,
        uri: result.uri,
        type: result.mimeType
      };

      // Create form data for API request
      const formData = new FormData();
      formData.append('file', file);
      try {
        // Extract text from the selected file
        const data = await extractText(formData, session);
        if (data == null || data.text == null || data.text == '') {
          alert(
            'Unable to parse text from selected file.  Please try a different file.'
          );
        } else {
          // Set the extracted text and update state variables
          setText(data.text);
          setHasFile(true);
          setFileName(file.name);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // useEffect hook to update state variables based on text input
  useEffect(() => {
    // Check if the 'text' variable is empty
    if (!text) {
      setNumQuestions(0);
      setMaxQuestions(0);
      setCharacters('0/50');
      setButtonDisabled(true);
      return;
    }
    // Calculate the length of the 'text' variable
    const charLen = text.length;
    const max = Math.floor(charLen / 50);
    setMaxQuestions(max);

    // Check if the length of the 'text' variable is less than 50 characters
    if (charLen < 50) {
      // If 'text' is less than 50 characters, update state variables accordingly
      setRemaining(50 - charLen);
      setCharacters(`${charLen}/50`);
      setDownDisabled(true);
      setUpDisabled(true);
      setButtonDisabled(true);
      return;
    } else {
      setButtonDisabled(false);
    }

    // Update state variables based on the length of 'text' variable
    setRemaining(50 - (charLen % 50));
    setCharacters(charLen.toString());

    // Determine the state of 'upDisabled' based on the number of questions
    if (numQuestions < max) {
      setUpDisabled(false);
    } else if (numQuestions === max) {
      setUpDisabled(true);
    }

    // Determine the state of 'downDisabled' based on the number of questions
    if (numQuestions === 1) {
      setDownDisabled(true);
    } else {
      setDownDisabled(false);
    }

    // Update the number of questions based on the length of 'text' variable
    if (numQuestions === 0 && charLen >= 50) {
      setNumQuestions(1);
    } else if (numQuestions > max) {
      setNumQuestions(max);
    }
  }, [text, numQuestions]);

  // useEffect hook to update state variables based on numQuestions
  useEffect(() => {
    text && numQuestions < maxQuestions
      ? setUpDisabled(false)
      : setUpDisabled(true);
    text && numQuestions > 1 ? setDownDisabled(false) : setDownDisabled(true);
  }, [numQuestions]);

  // Function to handle incrementing numQuestions
  const handleIncrement = () => {
    if (numQuestions < maxQuestions) {
      setNumQuestions(numQuestions + 1);
    }
  };

  // Function to handle decrementing numQuestions
  const handleDecrement = () => {
    if (numQuestions > 1) {
      setNumQuestions(numQuestions - 1);
    }
  };

  // Function to handle selection of question type
  const handleQuestionTypePress = (questionTypeContent) => {
    setSelectedQuestionType(questionTypeContent);
  };

  // Initialize selectedDifficulty state variable
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // Function to handle selection of difficulty
  const handleDifficultyPress = (difficultyContent) => {
    setSelectedDifficulty(difficultyContent);
  };

  // Function to handle the submission of questions to the next screen
  const onPressHandler = async () => {
    let passingQuestions = {};

    // Generate questions based on selected question type
    if (selectedQuestionType == 'Mixed') {
      passingQuestions = await getMixed(numQuestions, text, session);
    } else if (selectedQuestionType == 'True/False') {
      passingQuestions = await getTrueFalse(numQuestions, text, session);
    } else {
      passingQuestions = await getMultipleChoice(numQuestions, text, session);
    }

    // Process passingQuestions if a file is selected
    if (hasFile && passingQuestions) {
    }

    // If passingQuestions is generated successfully
    if (passingQuestions) {
      passingQuestions = JSON.parse(passingQuestions);

      // Create a file if a file is selected, otherwise use default name
      if (hasFile) {
        createFile(fileName, text, session);
      } else {
        console.log('quiz name', passingQuestions.quiz_name);
        createFile(passingQuestions.quiz_name, text, session);
      }

      // Navigate to the Answering Screen with passingQuestions as parameter
      navigation.navigate('Answering Screen', passingQuestions);

      // Reset state variables
      setText('');
      setHasFile(false);
      setFileName('');
      setSelectedQuestionType(null);
    } else {
      alert('Error Generating Quiz');
    }
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
              value={text}
              onChangeText={(text) => setText(text)}
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
          <View>
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
                disabled={buttonDisabled}
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
                disabled={buttonDisabled}
              />
              <BigButton
                buttonColor={
                  selectedQuestionType === 'Mixed'
                    ? colors.grey
                    : colors.lightGrey
                }
                textColor={
                  selectedQuestionType === 'Mixed' ? colors.white : colors.black
                }
                content={'Mixed'}
                onPress={() => handleQuestionTypePress('Mixed')}
                disabled={buttonDisabled}
              />
            </View>
          </View>
          <View style={localStyles.divider}>
            <Divider />
          </View>
          <View style={{ alignItems: 'center' }}>
            <BigButton
              buttonColor={colors.green}
              textColor={colors.black}
              content={'Next'}
              onPress={onPressHandler}
              disabled={buttonDisabled}
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
