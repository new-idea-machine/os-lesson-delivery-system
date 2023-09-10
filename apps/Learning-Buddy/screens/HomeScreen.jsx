import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Paragraph } from 'react-native-paper';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const HomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const { signOut, user } = auth;

  return (
    <View style={localStyles.container}>
      <Text>Hi {user.user_metadata.fullName}</Text>
      <Paragraph>Please use the drawer menu from the top left corner</Paragraph>
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Create new quiz'}
        onPress={() => navigation.navigate('New Quiz Screen2')}
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
    justifyContent: 'center',
    backgroundColor: colors.white
  }
});
