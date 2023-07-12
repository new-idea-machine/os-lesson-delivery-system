import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';

export default function QuestionRadioGroup({ question, UpdateGivenAnswers }) {
  const [value, setValue] = useState();

  // Combine two arrays into one to be rendered to frontend
  function CombineArrays(array1, array2) {
    // populate with values to shuffle
    let shuffledArray = [];
    shuffledArray.push(...array2);
    shuffledArray.push(array1);

    // shuffle answer array
    shuffledArray.sort(() => (Math.random() > 0.5 ? 1 : -1));

    // return shuffled array
    return shuffledArray;
  }

  return (
    <RadioButton.Group
      value={value}
      onValueChange={(newValue) => {
        setValue(newValue);
        UpdateGivenAnswers(question, newValue);
      }}
    >
      {/* Render inputs / radio options for given question */}
      {CombineArrays(question.options.Correct, question.options.Incorrect).map(
        (questionOption) => (
          <View style={localStyles.item} key={questionOption}>
            <RadioButton.Item
              position='trailing'
              label={questionOption}
              value={questionOption}
            />
          </View>
        )
      )}
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
