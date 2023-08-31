import * as React from 'react';
import { Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/colors';

export const ProgressScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Button
        mode='contained'
        onPress={() => navigation.navigate('Home Screen')}
      >
        Back To Home Screen
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.white
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  }
});
