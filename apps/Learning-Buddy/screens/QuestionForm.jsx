import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';

export const QuestionForm = () => {
  const ip = Constants.manifest.extra.IP;
  const [text, onChangeText] = useState('');
  const [numLines, changeNumLines] = useState(1);
  const [response, setResponse] = useState('');
  const [complete, setComplete] = useState(false);
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  useEffect(() => {
    const charLen = text.length;
    const suggestLines = Math.ceil(charLen / 50);
    suggestLines > 0 ? changeNumLines(suggestLines) : changeNumLines(1);
  }, [text]);

  const getQuestions = async () => {
    const testItem = { id: 1, question: text };
    const thing = JSON.stringify(testItem);
    try {
      const response = await fetch(`http://${ip}:8000/questions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // mode: 'no-cors',
        body: thing,
      });
      const json = await response.json();
      setResponse(json.response.choices[0].text);
    } catch (error) {
      console.error(error);
      setResponse('oh no, problem');
    } finally {
      setComplete(true);
    }
  };

  return (
    <View>
      <Text style={{ paddingTop: 20 }}>Enter text below{'\n'}</Text>
      <TextInput
        style={localStyles.input}
        placeholder="Test"
        onChangeText={(text) => onChangeText(text)}
        value={text}
        multiline
        numberOfLines={numLines}
      <Text style={{ paddingTop: 20 }}>
        Please select the number of questions you want:{'\n'}
      </Text>

      <Picker
        ref={pickerRef}
        selectedValue={questionNum}
        onValueChange={(itemValue, itemIndex) => {
          console.log('item value is now', itemValue);
          setQuestionNum(itemValue);
        }}
      >
        <Picker.Item label='1' value={1} />
        <Picker.Item label='2' value={2} />
        <Picker.Item label='3' value={3} />
        <Picker.Item label='4' value={4} />
        <Picker.Item label='5' value={5} />
        <Picker.Item label='6' value={6} />
        <Picker.Item label='7' value={7} />
        <Picker.Item label='8' value={8} />
        <Picker.Item label='9' value={9} />
        <Picker.Item label='10' value={10} />
      </Picker>
      {text ? (
        <Button title="Submit To Backend" onPress={getQuestions}></Button>
      ) : null}
      {complete ? <Text>Response is: {response}</Text> : null}
    </View>
  );
};

const localStyles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
