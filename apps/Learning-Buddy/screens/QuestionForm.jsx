import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';

export const QuestionForm = () => {
  const ip = Constants.manifest.extra.IP;
  const [text, onChangeText] = useState('');
  const [numLines, changeNumLines] = useState(1);
  const [response, setResponse] = useState('');
  const [complete, setComplete] = useState(false);

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
      ></TextInput>
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
