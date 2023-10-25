import React, { useContext, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import MenuBackButton from '../components/MenuBackButton';
import MenuInput from '../components/MenuInput';
import { colors } from '../config/colors';
import { AuthContext } from '../providers/AuthProvider';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

export const ForgotPasswordScreen = ({ navigation }) => {
  const styles = useContext(StyleSheetContext);
  const auth = useContext(AuthContext);
  const { resetPassword } = auth;
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formVerify = () => {
    setEmailError(false);
    let isValid = true;

    if (!email || !isValidEmail(email)) {
      setEmailError(true);
      isValid = false;
    }

    const returnVal = {
      email
    };

    if (isValid) {
      return returnVal;
    } else return false;
  };

  const handleForgotPassword = async () => {
    const verified = formVerify();
    if (verified) {
        Alert.alert("Send Email Blah Blah")
        //TODO: auth resetpassword blah blah sends reset password link 
    }
  };

  return (
    <View style={localStyles.viewStyle}>
      <View>
        <MenuBackButton navigation={navigation} />
        <Image
          style={localStyles.logoStyle}
          source={require('../assets/logo_placeholder-1.png')}
        ></Image>
        <Text style={styles.pageTitle}>FORGOT YOUR PASSWORD?</Text>
      </View>

      <View style={{ paddingTop: 30, alignItems: 'center', marginHorizontal: 50 }}>
        <Text>
          Confirm your email address below to recieve information on how to reset your
          password
        </Text>
      </View>

      <View style={{ paddingTop: 10, paddingBottom: 30, alignItems: 'center' }}>
        <MenuInput
          placeholder='Email'
          symbol='account-outline'
          hidden='false'
          setter={setEmail}
          autoCapitalize='none'
          autoCompleteType='email'
          textContentType='emailAddress'
          keyboardType='email-address'
          error={emailError}
        />
        {emailError && (
          <Text style={localStyles.generalError}>Invalid email</Text>
        )}
      </View>

      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'submit'}
        onPress={handleForgotPassword}
        uppercase='true'
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'go back'}
        onPress={() => navigation.goBack()}
        uppercase='true'
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  logoStyle: {
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: -80
  },
  viewStyle: {
    display: 'flex',
    paddingTop: 50,
    paddingHorizontal: 10,
    height: '100%'
  },
  generalError: {
    fontSize: 10,
    color: colors.red,
    textAlign: 'left'
  }
});
