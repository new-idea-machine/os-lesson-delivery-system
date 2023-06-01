import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState();


  // TODO: Remove, for testing purposes
  const getMessage = async () => {
    try {
      // Replace below URI with your own localhost, use ipConfig command in terminal to source your ipv4 address and replace up to the colon (:)
      const response = await fetch('http://192.168.86.137:8000/message', {
        // no-cors required to prevent conflict between emulator localhost/ server localhost
        mode: 'no-cors' 
      });
      const json = await response.json();
      console.log(json.data)
      setMessage(json.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMessage()
  },[])

  return (
    <View style={styles.container}>
    {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>{message}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
