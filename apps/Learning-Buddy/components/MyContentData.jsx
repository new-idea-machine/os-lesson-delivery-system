import React, { useState, useContext } from 'react';
import { listAllQuizes } from '../util/quizAPI';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../providers/AuthProvider';
import { View, StyleSheet, Text } from 'react-native';

import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

function MyContentData() {
  const [quizzes, setQuizzes] = useState([]);

  const auth = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        if (!auth.session) {
          return;
        }

        const data = await listAllQuizes(auth.session);
        console.log('Fetched DATA', data);
        if (data) {
          setQuizzes(data);
        }
      }

      fetchData();
    }, [auth.session])
  );

  return (
    <>
      <View style={localStyles.titleContainer}>
        <Text style={localStyles.title}>All Quizzes</Text>
      </View>
      <View style={localStyles.containerbodybuttons}>
        {quizzes.map((quiz) => (
          <Button mode='outlined' style={localStyles.button} key={quiz.id}>
            <View style={localStyles.buttonContent}>
              <Text style={[localStyles.fontStyles]}>{quiz.quiz_name}</Text>
              <View style={{ flex: 0.7 }} />
              <AntDesign name='arrowright' size={15} color='black' />
            </View>
          </Button>
        ))}
      </View>
    </>
  );
}

const localStyles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height: '30%'
  },
  divider: { marginVertical: 10 },
  header: {
    fontSize: 18,
    color: '#262626',
    fontWeight: '800'
  },
  containerbodybuttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '10%'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10,
    width: 266,
    height: 50
  },
  fontStyles: {
    fontWeight: '400',
    fontSize: 12,
    color: '#262626',
    fontFamily: 'Poppins'
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 23
  }
});

export default MyContentData;
