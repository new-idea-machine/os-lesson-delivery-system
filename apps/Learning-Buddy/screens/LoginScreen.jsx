import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Pressable,
  Image
} from 'react-native';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import MenuBackButton from '../components/MenuBackButton';
import MenuInput from '../components/MenuInput';
import BigButton from '../components/BigButton';

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
            source={require('../assets/Logo.png')}
          ></Image>
          <Text style={styles.pageTitle}>LOG IN</Text>
        </View>
        <View style={{ paddingVertical: 30, alignItems: 'center' }}>
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
          />
        </View>
        <Pressable style={{display:'flex', alignSelf:'flex-start', marginLeft:53}}
          onPress={() => {
            Alert.alert('Forgot Password');
          }}
        >
          <Text style={localStyles.required}>I Forget My Password</Text>
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
    width: 159,
    height: 118,
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: -20
  },
  viewStyle: {
    display: 'flex',
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 10,
    height: '100%'
  },
  required: {
    fontSize: 10,
    fontFamily: 'Medium',
    color: '#00B0FC',
    marginBottom: 30,
    letterSpacing: 1,
    textTransform:'capitalize'
  }
});
