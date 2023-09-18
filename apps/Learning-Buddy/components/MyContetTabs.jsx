import * as React from 'react';
import MyContentButtons from './MyContentButtons';
import { View, StyleSheet, Text } from 'react-native';


const MyContentTabs = () => {
  return (
    <View style={[localStyles.container, localStyles.divider]}>
      <Text style={localStyles.header}>My Content</Text>
      <MyContentButtons />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height:'30%'

  },
  divider: { marginVertical: 10 },
  header: {
    fontSize: 18,
    color: 262626,
    fontWeight: '800',
  }
});

export default MyContentTabs;
