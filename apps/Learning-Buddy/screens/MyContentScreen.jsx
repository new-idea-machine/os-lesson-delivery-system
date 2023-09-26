import * as React from 'react';
import { Divider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import MyContentTabs from '../components/MyContetTabs';
import MyContentBodyButtons  from '../components/MyContentBodyButtons';
import MyContentPagination from '../components/MyContentPagination';


export const MyContentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MyContentTabs />
      <Divider />
      <MyContentBodyButtons />
      <MyContentPagination />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderColor: 'blue',
    borderWidth: 2
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  divider: { marginVertical: 10 }
});
