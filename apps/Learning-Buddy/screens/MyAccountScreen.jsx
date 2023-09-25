import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const MyAccountScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const { signOut, user } = auth;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Back to Home Screen'}
        onPress={() => navigation.navigate('Home Screen')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.white
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  }
});
