import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, ProgressBar } from 'react-native-paper';

import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const QuizResultScreen = () => {
  const insets = useSafeAreaInsets();

  const [progress, setProgress] = React.useState(Math.random());

  const onPressHandler = async () => {};

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
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 35 }}>
          <View>
            <Text style={localStyles.pageTitle}>Quiz Result</Text>
          </View>
          <Text style={localStyles.title}>Your Grade is:</Text>
          <View>
            <Text
              style={{
                // marginVertical: 10,
                color: colors.lightOrange,
                fontFamily: 'Poppins',
                fontWeight: '900',
                fontSize: 22
              }}
            >
              66/100
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: 12,
                color: colors.grey
              }}
            >
              Your Overall Accuracy Rate
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10
              }}
            >
              <ProgressBar
                progress={progress}
                color={colors.lightOrange}
                style={{
                  borderRadius: 25,
                  height: 10,
                  maxWidth: '95%'
                }}
              />
              <Text style={{ marginLeft: 10, maxWidth: '100%' }}>65%</Text>
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Card onPress={() => {}} mode='elevated'>
              <Card.Title title='1. in which year did germany...' />
              <Card.Content>
                <Text style={{ color: colors.red }}>A. 1937</Text>
              </Card.Content>
            </Card>
            <Card onPress={() => {}} mode='elevated'>
              <Card.Title title='2. how long did it take germans...' />
              <Card.Content>
                <Text style={{ color: colors.lightBlue }}>B. 35 Days</Text>
              </Card.Content>
            </Card>
            <Card onPress={() => {}} mode='elevated'>
              <Card.Title title='3. what is the full name of...' />
              <Card.Content>
                <Text style={{ color: colors.lightBlue }}>
                  D. Republic Of Poland
                </Text>
              </Card.Content>
            </Card>
          </View>
          <View style={{ marginVertical: 10 }}>
            <BigButton
              buttonColor={colors.green}
              textColor={colors.black}
              content={'Retake this quiz'}
              onPress={onPressHandler}
            />
            <BigButton
              buttonColor={colors.green}
              textColor={colors.black}
              content={'Go to my content'}
              onPress={onPressHandler}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  iconButton: {
    width: 265,
    height: 55,
    borderRadius: 30,
    marginVertical: 10
  },
  card: {
    flex: 1,
    textColor: colors.black,
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    marginBottom: 10
  },
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
  }
});
