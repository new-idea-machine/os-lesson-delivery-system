import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../config/colors';
import Button from '../components/Button';
import Input from '../components/Input';

export const SignUpScreen = ({ navigation }) => {
  const [values, setValues] = useState({});

  // onHomeScreen is only for demo purpose
  // Delete it once authentication has been setup
  const onHomeScreen = () => {
    navigation.navigate('HomeScreen');
  };

  const onSignIn = () => {
    navigation.navigate('SignInScreen');
  };

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

        <Button onPress={onHomeScreen} style={styles.button} title='Sign Up' />

        <Text style={styles.footerText}>
          Already have an account?
          <Text onPress={onSignIn} style={styles.footerLink}>
            {' '}
            Sign In
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
