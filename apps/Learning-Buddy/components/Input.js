import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../config/colors';

const Input = ({ label, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder={placeholder} style={styles.input} />
      </View>
    </View>
  );
};

export default React.memo(Input);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  label: {
    marginBottom: 8,
    color: colors.black,
    fontSize: 14,
    fontWeight: '500'
  },
  inputContainer: {
    // borderWidth: 1,
    // borderColor: colors.grey,
    borderRadius: 26,
    backgroundColor: colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flex: 1
  }
});
