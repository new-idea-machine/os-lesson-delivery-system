import * as React from 'react';
import { Divider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import MyContentPagination from '../components/MyContentPagination';
import MyContentData from '../components/MyContentData';


export const MyContentScreen = () => {

  return (
    <View style={styles.container}>
      <Divider />
      <MyContentData/>
      <MyContentPagination />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  divider: { marginVertical: 10 }
});


