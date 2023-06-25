import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../config/colors';
import Button from '../components/Button';
import Input from '../components/Input';

export const SignInScreen = ({ navigation }) => {
  const [values, setValues] = useState({});

  // onHomeScreen is only for demo purpose
  // Delete it once authentication has been setup
  const onHomeScreen = () => {
    navigation.navigate('HomeScreen');
  };
  console.log(
    '🚀 ~ file: SignInScreen.jsx:13 ~ onHomeScreen ~ onHomeScreen:',
    onHomeScreen
  );

  const onSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

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

        <Button onPress={onHomeScreen} style={styles.button} title='Sign In' />

        <Text style={styles.footerText}>
          Don't have an account?
          <Text onPress={onSignUp} style={styles.footerLink}>
            {' '}
            Sign Up
          </Text>
        </Text>
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
  },
  footerText: {
    color: colors.black,
    marginBottom: 56,
    textAlign: 'center'
  },
  footerLink: {
    fontWeight: 'bold'
  }
});
