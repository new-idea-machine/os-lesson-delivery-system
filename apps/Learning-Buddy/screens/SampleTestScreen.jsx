import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { colors } from '../config/colors';
import FunctionOnPressBigButton from '../components/FunctionOnPressBigButton';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

const sampleTestData = [
  {
    prompt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie nunc dictum sapien auctor, et porttitor metus ornare. Nulla euismod, mauris interdum congue mattis, massa justo placerat metus, vel tincidunt.',
    type: 'multiple',
    options: {
      Correct: 'A',
      Incorrect: ['B', 'C', 'D'],
    }
  },
  {
    prompt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie nunc dictum sapien auctor, et porttitor metus ornare. Nulla euismod, mauris interdum congue mattis, massa justo placerat metus, vel tincidunt.',
    type: 'multiple',
    options: {
      Correct: 'C',
      Incorrect: ['A', 'B', 'D'],
    }
  },
  {
    prompt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie nunc dictum sapien auctor, et porttitor metus ornare. Nulla euismod, mauris interdum congue mattis, massa justo placerat metus, vel tincidunt.',
    type: 'multiple',
    options: {
      Correct: 'D',
      Incorrect: ['A', 'B', 'C', 'E'],
    }
  }
];

export const SampleTestScreen = () => {
  const auth = useContext(AuthContext);
  const styles = useContext(StyleSheetContext);
  const { signOut, user } = auth;

  return (
    <SafeAreaView style={localStyles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>SAMPLE TEST</Text>
        {sampleTestData.map((e, i) => {
          return (
            <View style={localStyles.card} key={i}>
              <Text>Question {i + 1}</Text>
              <Text>Question Type: {e.type}</Text>
              <Text>{e.prompt}</Text>
              <Text>Correct Answer: {e.options.Correct}</Text>
              <Text>Other Options: {e.options.Incorrect}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={localStyles.footer}>
        <FunctionOnPressBigButton
          content={'Submit'}
          onPress={() => {
            console.log('TODO: Submit Test');
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
