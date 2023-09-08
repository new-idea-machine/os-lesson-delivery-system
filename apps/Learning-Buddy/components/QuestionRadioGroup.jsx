import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';

export default function QuestionRadioGroup({ question, UpdateGivenAnswers }) {
  const [value, setValue] = useState();
  const [orderedOptions, setOrderedOptions] = useState([]);

  useEffect(() => {
    let randomizedOptions = [];
    if (question.qtype == 2) {
      randomizedOptions = sortTrueFalse(
        question.options.Correct,
        question.options.Incorrect
      );
    } else {
      randomizedOptions = ShuffleOptions(
        question.options.Correct,
        question.options.Incorrect
      );
    }
    setOrderedOptions(randomizedOptions);
  }, []);

  // Combine two arrays into one to be rendered to frontend
  function ShuffleOptions(array1, array2) {
    // populate with values to shuffle
    let shuffledArray = [];
    shuffledArray.push(...array2);
    shuffledArray.push(array1);

    // shuffle answer array
    shuffledArray.sort(() => (Math.random() > 0.5 ? 1 : -1));

    // return shuffled array
    return shuffledArray;
  }

  // Combine two arrays into one to be rendered to frontend
  function sortTrueFalse(array1, array2) {
    // populate with values to shuffle
    let sortedArray = [];
    sortedArray.push(...array2);
    sortedArray.push(array1);

    // shuffle answer array
    sortedArray.sort((a, b) => {
      if (a < b) {
        return 1;
      }
      return -1;
    });

    // return shuffled array
    return sortedArray;
  }

  return (
    <RadioButton.Group
      value={value}
      onValueChange={(newValue) => {
        setValue(newValue);
        UpdateGivenAnswers(question, newValue, orderedOptions);
      }}
    >
      {/* Render inputs / radio options for given question */}
      {orderedOptions.map((questionOption) => (
        <View style={localStyles.item} key={questionOption}>
          <RadioButton.Item
            position='trailing'
            label={questionOption}
            value={questionOption}
          />
        </View>
      ))}
    </RadioButton.Group>
  );
}

const localStyles = StyleSheet.create({
  item: {
    minWidth: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#d6d6d6',
    paddingHorizontal: 10,
    marginVertical: 5
  }
});
