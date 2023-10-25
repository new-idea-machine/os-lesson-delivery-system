import React, { useContext, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import MenuBackButton from '../components/MenuBackButton';
import MenuInput from '../components/MenuInput';
import { colors } from '../config/colors';
import { AuthContext } from '../providers/AuthProvider';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

export const ResetPasswordScreen = ({ navigation }) => {
  const styles = useContext(StyleSheetContext);
  const auth = useContext(AuthContext);
  const { signInWithEmail } = auth;
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState()
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const formVerify = () => {
    setPasswordError(false);
    setConfirmPasswordError(false);
    let isValid = true;

    if (!password) {
      setPasswordError(true);
      isValid = false;
    }

    if(!confirmPassword) {
      setConfirmPasswordError(true);
      isValid = false;
    }

    if((confirmPassword !== password)) {
      setConfirmPasswordError(true);
      isValid = false;
    }

    const returnVal = {
      password
    };

    if (isValid) {
      return returnVal;
    } else return false;
  };

  const handleResetPassword = async () => {
    const verified = formVerify();
    if (verified) {
      //TODO: save the reset to database
      Alert.alert(`Password reset to ${verified.password}`)
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
        <Text style={styles.pageTitle}>RESET PASSWORD</Text>
      </View>

      <View style={{ paddingTop: 30, alignItems: 'center', marginHorizontal: 100}}>
        <Text style={{textAlign: "center" }}>Enter a new and secure password for your account below.</Text>
      </View>

      <View style={{ paddingTop: 10, paddingBottom: 30, alignItems: 'center' }}>
        <MenuInput
          placeholder='Password'
          symbol='lock-outline'
          hidden='true'
          setter={setPassword}
          right
          error={passwordError}
        />

        {passwordError && (
          <Text style={localStyles.generalError}>Invalid password</Text>
        )}

        <MenuInput
          placeholder='Confirm Password'
          symbol='lock-outline'
          hidden='true'
          setter={setConfirmPassword}
          right
          error={passwordError}
        />

        {confirmPasswordError && (
          <Text style={localStyles.generalError}>Passwords do not match</Text>
        )}
      </View>

      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'submit'}
        onPress={handleResetPassword}
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
