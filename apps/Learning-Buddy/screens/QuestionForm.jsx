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
    //   console.log('Charlen is', charLen)
    const suggestLines = Math.ceil(charLen / 50);
    //   console.log('Lines are', suggestLines);
    suggestLines > 0 ? changeNumLines(suggestLines) : changeNumLines(1);
  }, [text]);

  const getQuestions = async () => {
    const testItem = { id: 1, question: text };
    // console.log(text);
    console.log(testItem);
    const thing = JSON.stringify(testItem);
    console.log('THING IS', thing);
    try {
      // console.log(text)
      const response = await fetch(`http://${ip}:8000/questions/`, {
        // method: 'GET',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // mode: 'no-cors',
        body: thing,
      });
      const json = await response.json();
      console.log(json.response.choices[0]);
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
        style={styles.input}
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

const styles = StyleSheet.create({
  input: {
    // height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    // width: 100,
  },
});
