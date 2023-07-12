import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { colors } from '../config/colors';
import BigButton from '../components/BigButton';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import SampleTestData from '../data/SampleTestData.json';
import { RadioButton } from 'react-native-paper';

export const AnsweringScreen = () => {
  const styles = useContext(StyleSheetContext);
  const [value, setValue] = useState('50,000 x Stronger');

  // function ShuffleAnswers(array1, array2) {
  //   // populate with values to shuffle
  //   let shuffledArray = [];
  //   shuffledArray.push(...array2);
  //   shuffledArray.push(array1);

  //   // shuffle answer array
  //   shuffledArray.sort(() => (Math.random() > 0.5 ? 1 : -1));

  //   // return shuffled array
  //   return shuffledArray;
  // }

  function CombineArrays(array1, array2) {
    // populate with values to shuffle
    let shuffledArray = [];
    shuffledArray.push(...array2);
    shuffledArray.push(array1);

    return shuffledArray;
  }

  let radioGroupInitalState = [];

  SampleTestData.questions.map((e) => {
    radioGroupInitalState.push({
      value: ''
    });
  });

  const [radioGroupState, setRadioGroupState] = useState(radioGroupInitalState);
  

  function handleRadioInput(i, radioCurrent) {

    const updateRadioState = radioGroupState.map((radioState, index) => {
      if (i === index) {
        const newRadioState = {
          value: radioCurrent
        };
        return newRadioState;
      } else {
        return radioState;
      }
    });

    setRadioGroupState(updateRadioState);
  }

  return (
    <SafeAreaView style={localStyles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>SAMPLE TEST</Text>
        {SampleTestData.questions.map((e, i) => {
          return (
            <View style={localStyles.card} key={i}>
              <Text>Question {i + 1}</Text>
              <Text>{e.question1}</Text>
              {console.log(radioGroupState)}
              <RadioButton.Group
                value={radioGroupState[i].value}
                onValueChange={(newValue) => {
                  handleRadioInput(i, newValue);
                }}
                style={localStyles.groupContainer}
              >
                {CombineArrays(e.options.Correct, e.options.Incorrect).map(
                  (e) => (
                    <View style={localStyles.item} key={e}>
                      <RadioButton.Item
                        position='trailing'
                        label={e}
                        value={e}
                      />
                    </View>
                  )
                )}
              </RadioButton.Group>
            </View>
          );
        })}
      </ScrollView>
      <View style={localStyles.footer}>
        <BigButton
          buttonColor={colors.green}
          textColor={colors.black}
          content={'Submit'}
          onPress={() => {
            console.log(value);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    minWidth: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#d6d6d6',
    paddingHorizontal: 10,
    marginVertical: 5
  },
  footer: {
    paddingTop: 20
  },
  card: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.lightGrey
  }
});
