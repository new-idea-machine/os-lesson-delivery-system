import React, { useContext, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import { Checkbox, Divider } from 'react-native-paper';
import NavigationBigButton from '../components/NavigationBigButton';
import MenuBackButton from '../components/MenuBackButton';
import MenuInput from '../components/MenuInput';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import { colors } from '../config/colors';

export const SignUpScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const styles = useContext(StyleSheetContext);

  const formVerify = () => {
    if (name && email && password && password2) {
      if (password === password2) {
        if (checked) {
          const returnVal = {
            name,
            email,
            password,
            ...(phone && { phone })
          };
          return returnVal;
        } else Alert.alert('Please accept our Terms of Service');
      } else Alert.alert(`Passwords don't match`);
    } else Alert.alert('Missing a required field');
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
          <Text style={localStyles.required}>fields with a * are required</Text>
          <MenuInput
            placeholder='Your Full Name'
            symbol='account-outline'
            required='true'
            hidden='false'
            setter={setName}
          />
          <MenuInput
            placeholder='Your Email'
            symbol='email-outline'
            required='true'
            hidden='false'
            setter={setEmail}
          />
          <MenuInput
            placeholder='Your Phone Number'
            symbol='phone-outline'
            hidden='false'
            setter={setPhone}
          />
          <MenuInput
            placeholder='Password'
            symbol='lock-outline'
            required='true'
            hidden='true'
            setter={setPassword}
            right
          />
          <MenuInput
            placeholder='Re-enter Password'
            symbol='lock-outline'
            required='true'
            hidden='true'
            setter={setPassword2}
            right
          />
        </View>
        {/* This button will need to pass values to auth process in future iterations */}
        <NavigationBigButton
          navigation={navigation}
          content={'next'}
          formVerify={formVerify}
          destination={'Log in'}
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
  }
});
