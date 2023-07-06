import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../providers/AuthProvider';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const { signOut, user } = auth;

  return (
    <View style={localStyles.container}>
      <Text>Hi {user.user_metadata.fullName}</Text>
      <Button
        title='Get your questions!'
        onPress={() => navigation.navigate('Question Form')}
      ></Button>

      <Button
        title='Try Sample Test!'
        onPress={() => navigation.navigate('Sample Test')}
      ></Button>

      <Button title='Sign Out' onPress={() => signOut()}></Button>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
