import React, { useState, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Text,
  Image
} from 'react-native';
// import { Text } from 'react-native-paper';
import { StyleSheetContext } from '../providers/StyleSheetProvider';
import Button from '../components/Button';
import Input from '../components/Input';
import MenuBackButton from '../components/MenuBackButton';
import MenuInput from '../components/MenuInput';

export const SignUpScreen = ({ navigation }) => {
  const [values, setValues] = useState({});
  const styles = useContext(StyleSheetContext);

  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const onSubmit = async () => {
    console.log('Sign Up');
  };

  return (
    <View style={{ paddingTop: 50, paddingHorizontal: 10 }}>
      <ScrollView style={styles.container}>
        <View>
          <MenuBackButton navigation={navigation} />
          <Text style={styles.pageTitle}>Sign Up</Text>
        </View>
        {/* <Input
          value={values.fullName}
          onChangeText={(v) => onChange('fullName', v)}
          label='Name'
          placeholder='Enter your full name'
        />
        <Input
          value={values.username}
          onChangeText={(v) => onChange('username', v)}
          label='Username'
          placeholder='Enter your username'
        />
        <Input
          value={values.email}
          onChangeText={(v) => onChange('email', v)}
          label='E-mail'
          placeholder='Enter your email'
        />
        <Input
          value={values.password}
          onChangeText={(v) => onChange('password', v)}
          isPassword
          label='Password'
          placeholder='*******'
        />
        <Input
          value={values.confirmPassword}
          onChangeText={(v) => onChange('confirmPassword', v)}
          isPassword
          label='Confirm Password'
          placeholder='*******'
        /> */}
        <View style={{paddingBottom:50, paddingTop:40, alignItems:'center'}}>

        <MenuInput placeholder='Your Full Name'/>
        <MenuInput placeholder='Your Email'/>
        <MenuInput placeholder='Your Phone Number'/>
        <MenuInput placeholder='Password'/>
        <MenuInput placeholder='Re-enter Password'/>
        </View>

        <Button onPress={onSubmit} style={styles.button} title='Next' />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  button: {
    marginVertical: 20
  }
});
