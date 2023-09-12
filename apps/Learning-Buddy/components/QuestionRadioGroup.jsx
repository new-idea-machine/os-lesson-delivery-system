import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { colors } from '../config/colors';

export default function QuestionRadioGroup({ question, UpdateGivenAnswers, FindCurrentChosenAnswer }) {
  const [value, setValue] = useState();
  const [orderedOptions, setOrderedOptions] = useState([]);
  const [currentRadio, setCurrentRadio] = useState('');
  const letterValue = ['A', 'B', 'C', 'D'];

  // randomizes options for MC or sorts option for TF
  useEffect(() => {
    let arrangedOptions = [];
    if (question.qtype == 2) {
      arrangedOptions = sortTrueFalse(
        question.options.Correct,
        question.options.Incorrect
      );
    } else {
      arrangedOptions = ShuffleOptions(
        question.options.Correct,
        question.options.Incorrect
      );
    }

    // set final question ordering
    setOrderedOptions(arrangedOptions);

    // when user moves back to question preselected previous answer
    setCurrentRadio(FindCurrentChosenAnswer(question.prompt));
  }, []);

  // Combine two arrays into one to be rendered to frontend
  const  ShuffleOptions = (array1, array2) => {
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
        setCurrentRadio(newValue);
      }}
    >
      {/* Render inputs / radio options for given question */}
      {orderedOptions.map((questionOption, index) => (
        <View
          style={
            currentRadio === questionOption
              ? localStyles.selectedItem
              : localStyles.unselectedItem
          }
          key={questionOption}
        >
          <RadioButton.Item
            label={letterValue[index] + '. ' + questionOption}
            value={questionOption}
            labelStyle={
              currentRadio === questionOption
                ? localStyles.unselectedLabel
                : localStyles.selectedLabel
            }
            color='transparent'
            uncheckedColor='transparent'
          />
        </View>
      ))}
    </RadioButton.Group>
  );
}

const localStyles = StyleSheet.create({
  unselectedItem: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15
  },
  selectedItem: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: colors.grey
  },
  unselectedLabel: {
    fontSize: 12,
    marginHorizontal: 15,
    letterSpacing: 1,
    color: colors.white
  },
  selectedLabel: {
    fontSize: 12,
    marginHorizontal: 15,
    letterSpacing: 1,
    color: colors.black
  }
});
