import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Alert } from 'react-native';
import { Divider, Checkbox } from 'react-native-paper';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import BigButton from '../components/BigButton';
import MenuBackButton from '../components/MenuBackButton';
import MenuInput from '../components/MenuInput';

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
    <View style={localStyles.viewstyle}>
      <ScrollView style={styles.container}>
        <View>
          <MenuBackButton navigation={navigation} />
          <Text style={styles.pageTitle}>SIGN UP</Text>
        </View>

        <View
          style={{ paddingBottom: 45, paddingTop: 25, alignItems: 'center' }}
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
          />
          <MenuInput
            placeholder='Re-enter Password'
            symbol='lock-outline'
            required='true'
            hidden='true'
            setter={setPassword2}
          />
        </View>

        <BigButton
          navigation={navigation}
          content={'next'}
          formVerify={formVerify}
          destination={'Test Screen'}
        />
        <Divider style={localStyles.dividerstyle} />
        <View style={localStyles.bottomsection}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color='#979797'
            uncheckedColor='#979797'
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={localStyles.accepttext}>
            I Accept 24-7 Learning Buddy’s <Text style={localStyles.accepttextlinked} onPress={()=>{Alert.alert('hi')}}>Terms of Service</Text>, And <Text style={localStyles.accepttextlinked} onPress={()=>{Alert.alert('hi')}}>Privacy Policy</Text>.
          </Text>
          {/* <Checkbox.Item
            label='I Accept 24-7 Learning Buddy’s Terms of Service, And Privacy Policy.'
            labelStyle={localStyles.accepttext}
            status={checked ? 'checked' : 'unchecked'}
            color='#979797'
            uncheckedColor='#979797'
            position='leading'
            onPress={() => {
              setChecked(!checked);
            }}
            style={{ marginLeft: 10, paddingLeft: 0 }}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  required: {
    fontSize: 10,
    color: '#00B0FC',
    marginLeft: -145
  },
  viewstyle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 10,
    height: '100%'
  },
  dividerstyle: {
    marginTop: 24,
    // color: 'pink',
    width: 266,
    alignSelf: 'center'
  },
  bottomsection: {
    // borderColor: 'black',
    // backgroundColor: 'blue',
    height: 100,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  accepttext: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#979797',
    width: '85%',
    paddingLeft: 10,
    textAlign: 'left',
    lineHeight: 15,
    letterSpacing: 1
    // backgroundColor:'red'
  },
  accepttextlinked: {
    fontFamily: 'SemiBold',
    fontSize: 12,
    color: '#00b0fc',
    width: '85%',
    paddingLeft: 10,
    textAlign: 'left',
    lineHeight: 15,
    letterSpacing: 1,
    textDecorationLine:'underline'
    // backgroundColor:'red'
  }
});
