import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { colors } from '../config/colors';
import BigButton from '../components/BigButton';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import SampleTestData from '../data/SampleTestData.json';

export const AnsweringScreen = () => {
  const styles = useContext(StyleSheetContext);

  function ShuffleAnswers(array1, array2) {
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
    <SafeAreaView style={localStyles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>SAMPLE TEST</Text>
        {SampleTestData.questions.map((e, i) => {
          return (
            <View style={localStyles.card} key={i}>
              <Text>Question {i + 1}</Text>
              <Text>{e.question1}</Text>
              <Text>
              <Text>
                TODO: Radio Buttons:{' '}
                {ShuffleAnswers(e.options.Correct, e.options.Incorrect)}
              </Text>
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={localStyles.footer}>
        <BigButton
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
