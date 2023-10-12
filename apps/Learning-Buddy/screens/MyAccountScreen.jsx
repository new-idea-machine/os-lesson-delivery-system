import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

import { useFocusEffect } from '@react-navigation/native';
import { getUserById } from '../util/usersAPI';


export const MyAccountScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const { signOut, session } = auth;
  const [userInfo, setUserInfo] = useState({});

  // Optional: figure out how to upload avatar photos to supabase (do this in a different branch)
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const user = await getUserById(session);
        setUserInfo(user);
      };
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <Text>{userInfo.fullname}</Text>
      <Text>{userInfo.email}</Text>
      <Text>{userInfo.avatar_url}</Text>
      <Text>{userInfo.phonenumber}</Text>

      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Back to Home Screen'}
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'Home Stack',
            params: { screen: 'My Home Screen' }
          })
        }
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
