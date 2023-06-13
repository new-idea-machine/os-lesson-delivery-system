import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

export const SignInScreen = () => {
  const [values, setValues] = useState({});

  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const onSubmit = async () => {
    console.log('Sign In');
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        <Input
          value={values.username}
          onChangeText={(v) => onChange('username', v)}
          label='Username'
          placeholder='Enter your username'
        />

        <Input
          value={values.password}
          onChangeText={(v) => onChange('password', v)}
          isPassword
          label='Password'
          placeholder='*******'
        />

        <Button onPress={onSubmit} style={styles.button} title='Sign In' />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  button: {
    marginVertical: 20
  }
});
