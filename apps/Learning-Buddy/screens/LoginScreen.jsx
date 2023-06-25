import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import BigButton from '../components/BigButton';
import MenuBackButton from '../components/MenuBackButton';
import MenuInput from '../components/MenuInput';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import { colors } from '../config/colors';

export const LoginScreen = ({ navigation }) => {
  const styles = useContext(StyleSheetContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const formVerify = () => {
    if (email && password) {
      const returnVal = {
        email,
        password
      };
      return returnVal;
    } else Alert.alert('Missing a required field');
  };

  return (
    <View style={localStyles.viewStyle}>
        <View>
          <MenuBackButton navigation={navigation}/>
          <Image
            style={localStyles.logoStyle}
            source={require('../assets/logo_placeholder-1.png')}
          ></Image>
          <Text style={styles.pageTitle}>LOG IN</Text>
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 30, alignItems: 'center' }}>
          <MenuInput
            placeholder='Email'
            symbol='account-outline'
            hidden='false'
            setter={setEmail}
          />
          <MenuInput
            placeholder='Password'
            symbol='lock-outline'
            hidden='true'
            setter={setPassword}
            right
          />
        </View>
        <Pressable style={{display:'flex', alignSelf:'flex-start', marginLeft:53}}
          onPress={() => {
            Alert.alert('Forgot Password');
          }}
        >
          <Text style={localStyles.forgotPassword}>I Forget My Password</Text>
        </Pressable>
        {/* This button will need to pass values to auth process in future iterations */}
        <BigButton
          navigation={navigation}
          content={'next'}
          formVerify={formVerify}
          destination={'Sign up'}
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
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingHorizontal: 10,
    height: '100%'
  },
  forgotPassword: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: colors.lightBlue,
    marginBottom: 30,
    letterSpacing: 1,
    textTransform:'capitalize'
  }
});
