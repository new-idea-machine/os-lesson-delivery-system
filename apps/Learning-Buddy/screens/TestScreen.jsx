import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { colors } from '../config/colors';

export const TestScreen = () => {
    const ip = Constants.manifest.extra.IP;
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState();
    const navigation = useNavigation();

  
    // TODO: Remove, for testing purposes
    const getMessage = async () => {
      try {
        const response = await fetch(`http://${ip}:8000/message`, {
          // no-cors required to prevent conflict between emulator localhost/ server localhost
          // mode: 'no-cors',
        });
        const json = await response.json();
        setMessage(json.data.message);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getMessage();
    }, []);
  
    return (
      <View style={localStyles.container}>
        {isLoading ? <Text>Still Loading...</Text> : <Text>{message}{"\n"}</Text>}
        {!isLoading? <Button title="Get your questions!" onPress={() => navigation.navigate('Question Form')}></Button>: null}
      </View>
    );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
