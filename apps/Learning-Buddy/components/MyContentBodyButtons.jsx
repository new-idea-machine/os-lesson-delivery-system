import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

const buttonName = [
  'Javascript Libraries',
  'Javascript Objects',
  'PHP Comments',
  'PHP Echo statements',
  'PHP Post Statements'
];

const MyContentBodyButtons = () => {
  return (
    <>
      <View style={localStyles.titleContainer}>
        <Text style={localStyles.title}>All Quizzes</Text>
      </View>
      <View style={localStyles.container}>
        {buttonName.map((buttonName, key) => (
          <Button mode='outlined' style={localStyles.button} key={key}>
            <View style={localStyles.buttonContent}>
              <Text style={[localStyles.fontStyles]}>{buttonName}</Text>
              <View style={{ flex: 0.7 }} />
              <AntDesign name='arrowright' size={15} color='black' />
            </View>
          </Button>
        ))}
      </View>
    </>
  );
};

const localStyles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '10%'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10,
    width: 266,
    height: 50
  },
  fontStyles: {
    fontWeight: '400',
    fontSize: 12,
    color: '#262626',
    fontFamily: 'Poppins'
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 23  
  }
});

export default MyContentBodyButtons;
