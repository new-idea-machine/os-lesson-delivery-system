import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

const SignUpScreen = () => {
  const [values, setValues] = useState({});

  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const onSubmit = async () => {
    console.log('Sign Up');
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        <Input
          value={values.fullName}
          onChangeText={(v) => onChange('fullName', v)}
          label='Name'
          placeholder='Enter your full name'
        />
        <Input
          value={values.username}
          onChangeText={(v) => onChange('username', v)}
          label='Username'
          placeholder='Enter your username'
        />
        <Input
          value={values.email}
          onChangeText={(v) => onChange('email', v)}
          label='E-mail'
          placeholder='Enter your email'
        />
        <Input
          value={values.password}
          onChangeText={(v) => onChange('password', v)}
          isPassword
          label='Password'
          placeholder='*******'
        />
        <Input
          value={values.confirmPassword}
          onChangeText={(v) => onChange('confirmPassword', v)}
          isPassword
          label='Confirm Password'
          placeholder='*******'
        />

        <Button onPress={onSubmit} style={styles.button} title='Sign Up' />
      </ScrollView>
    </View>
  );
};

export default React.memo(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  button: {
    marginVertical: 20
  }
});
