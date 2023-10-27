import React, { useContext, useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../providers/AuthProvider';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';
import { useFocusEffect } from '@react-navigation/native';
import { getUserById, updateAccount } from '../util/usersAPI';


export const MyAccountScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const { signOut, session } = auth;
  const [userInfo, setUserInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);

  // Optional: figure out how to upload avatar photos to supabase (do this in a different branch)
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const user = await getUserById(session);
        setUserInfo({
          "Full Name": user.fullname,
          "Email": user.email,
          "Phone Number": user.phonenumber
        });
      };
      fetchData();
    }, [])
  );

  const updateUserInfo = (key, newText) => {
    newUserInfo = userInfo;
    newUserInfo[`${key}`] = newText;
    setUserInfo(newUserInfo);
  };

  const submitUserInfo = async () => {
    const submittedInfo = await updateAccount(userInfo, session);
    setErrorMessage((submittedInfo) ? false : true);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatarStyle}
        source={require('../assets/no_avatar.png')}
      />
      <Text style={styles.title}>My Account</Text>
      {Object.keys(userInfo).map(key => (
        <View key={key}>
          <Text style={styles.text}>{key}: </Text>
          <View style={styles.textInputContainer}>
          <TextInput
            mode='flat'
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            style={styles.input}
            onChangeText={(newText) => updateUserInfo(key, newText)}
            defaultValue={userInfo[`${key}`]}
            editable={(key=="Email") ? false : true}
          />
          </View>
        </View>
        ))}

        {(errorMessage) &&
        <Text style={`${styles.text} ${styles.error}`}>
            Please, ensure the information is proper.
        </Text>
        }

      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Update Information'}
        onPress={() =>
          submitUserInfo()
        }
      />
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
  avatarStyle: {
    alignSelf: 'center',
    margin: 20,
    width: 66,
    height: 58,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  error: {
    color: colors.red
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    width: '100%',
    margin: 10,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    backgroundColor: colors.lightGrey
  }
});
