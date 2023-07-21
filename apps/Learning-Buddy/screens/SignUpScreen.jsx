import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, Divider } from 'react-native-paper';
import BigButton from '../components/BigButton';
import MenuBackButton from '../components/MenuBackButton';
import MenuInput from '../components/MenuInput';
import { colors } from '../config/colors';
import { AuthContext } from '../providers/AuthProvider';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

export const SignUpScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const styles = useContext(StyleSheetContext);
  const auth = useContext(AuthContext);
  const { signUpWithEmail } = auth;

  const formVerify = () => {
    if (!name) setNameError(true);
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!password2) setPassword2Error(true);

    if (password !== password2) {
      setPasswordError(true);
      setPassword2Error(true);
    }

    if (!checked) {
      Alert.alert('Please accept our Terms of Service');
      return false;
    }

    if (nameError || emailError || passwordError || password2Error)
      return false;

    return {
      name,
      email,
      password,
      phone
    };
  };

  const handleSubmitSignUp = async () => {
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setPassword2Error(false);
    try {
      const verifiedForm = formVerify();

      if (verifiedForm) {
        const status = await signUpWithEmail(
          verifiedForm.email,
          verifiedForm.password,
          verifiedForm.name,
          verifiedForm.phone
        );

        if (status === 'SignedUp') {
          Alert.alert('Success! You are signed up!');
        } else {
          Alert.alert(status);
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={localStyles.viewStyle}>
        <View>
          <MenuBackButton navigation={navigation} />
          <Text style={styles.pageTitle}>SIGN UP</Text>
        </View>
        <View
          style={{ paddingBottom: 40, paddingTop: 25, alignItems: 'center' }}
        >
          <Text style={localStyles.required}>Fields with a * are required</Text>
          <MenuInput
            placeholder='Your Full Name'
            symbol='account-outline'
            required='true'
            hidden='false'
            setter={setName}
            error={nameError}
          />
          {nameError && (
            <Text style={localStyles.passwordError}>Invalid name</Text>
          )}
          <MenuInput
            placeholder='Your Email'
            symbol='email-outline'
            required='true'
            hidden='false'
            setter={setEmail}
            autoCapitalize='none'
            autoCompleteType='email'
            textContentType='emailAddress'
            keyboardType='email-address'
            error={emailError}
          />
          {emailError && (
            <Text style={localStyles.passwordError}>Invalid email</Text>
          )}
          <MenuInput
            placeholder='Your Phone Number'
            symbol='phone-outline'
            hidden='false'
            setter={setPhone}
            textContentType='telephoneNumber'
            keyboardType='phone-pad'
          />
          <MenuInput
            placeholder='Password'
            symbol='lock-outline'
            required='true'
            hidden='true'
            setter={setPassword}
            right
            error={passwordError}
          />
          {passwordError && (
            <Text style={localStyles.passwordError}>Invalid password</Text>
          )}
          <MenuInput
            placeholder='Re-enter Password'
            symbol='lock-outline'
            required='true'
            hidden='true'
            setter={setPassword2}
            right
            error={password2Error}
          />
          {password2Error && (
            <Text style={localStyles.passwordError}>Invalid password</Text>
          )}
        </View>
        <BigButton
          buttonColor={colors.green}
          textColor={colors.black}
          content={'next'}
          onPress={handleSubmitSignUp}
          uppercase={true}
        />
        <Divider style={localStyles.dividerStyle} />
        <View style={localStyles.bottomSection}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color={colors.grey}
            uncheckedColor={colors.grey}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={localStyles.acceptText}>
            I Accept 24-7 Learning Buddy’s{' '}
            <Text
              style={localStyles.acceptTextLinked}
              onPress={() => {
                Alert.alert('Terms of Service');
              }}
            >
              Terms of Service
            </Text>
            , And{' '}
            <Text
              style={localStyles.acceptTextLinked}
              onPress={() => {
                Alert.alert('Privacy Policy');
              }}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const localStyles = StyleSheet.create({
  required: {
    fontSize: 10,
    color: colors.lightBlue,
    marginLeft: -120,
    letterSpacing: 1
  },
  viewStyle: {
    display: 'flex',
    paddingTop: 50,
    paddingHorizontal: 10,
    height: '100%'
  },
  dividerStyle: {
    marginTop: 22,
    paddingTop: 1,
    width: 266,
    alignSelf: 'center'
  },
  bottomSection: {
    height: 100,
    width: 300,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  acceptText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: colors.grey,
    width: '85%',
    paddingLeft: 10,
    textAlign: 'left',
    lineHeight: 15,
    letterSpacing: 1
  },
  acceptTextLinked: {
    fontFamily: 'SemiBold',
    fontSize: 12,
    color: colors.lightBlue,
    width: '85%',
    paddingLeft: 10,
    textAlign: 'left',
    lineHeight: 15,
    letterSpacing: 1,
    textDecorationLine: 'underline'
  },
  passwordError: {
    fontSize: 10,
    color: colors.red,
    textAlign: 'left'
  }
});
