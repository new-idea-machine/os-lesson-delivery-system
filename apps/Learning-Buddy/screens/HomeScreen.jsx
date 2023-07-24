import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../providers/AuthProvider';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const { signOut, user } = auth;

  return (
    <View style={localStyles.container}>
      <Text>Hi {user.user_metadata.fullName}</Text>
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Create new quiz'}
        onPress={() => navigation.navigate('New Quiz Screen')}
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Get your questions!'}
        onPress={() => navigation.navigate('Question Form')}
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Try Sample Test!'}
        onPress={() => navigation.navigate('Answering Screen')}
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Quiz Result'}
        onPress={() => navigation.navigate('Quiz Result Screen')}
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Sign Out'}
        onPress={() => signOut()}
      />
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
