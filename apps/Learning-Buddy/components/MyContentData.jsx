import React, { useState, useContext } from 'react';
import { listAllQuizes } from '../util/quizAPI';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../providers/AuthProvider';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../config/colors';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

function MyContentData() {
  const [quizzes, setQuizzes] = useState([]);
  let textColor = colors.black;
  const auth = useContext(AuthContext);
  const MyContentButtonsNames = ['All Quizzes', 'Folders', 'Categories'];


  const fetchData = React.useCallback(async () => {
    if (!auth.session) {
      return;
    }

    const data = await listAllQuizes(auth.session);

    if (data) {
      setQuizzes(data);
    }
  }, [auth.session]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  return (
    <>
      <View style={localStyles.titleContainer}>
        <Text style={localStyles.title}>All Quizzes</Text>
      </View>
      <View style={localStyles.containertab}>
        {MyContentButtonsNames.map((buttonName) => (
          <Button
            labelStyle={[localStyles.fontStyletab, { color: textColor }]}
            mode='outlined'
            style={localStyles.buttontab}
            key={buttonName}
            onPress={fetchData}  // Call the fetchData function on button press
          >
            <Text style={localStyles.fontFamily}>{buttonName}</Text>
          </Button>
        ))}
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
  },
  containertab: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'start'
  },
  buttontab: {
    margin: 10,
    borderRadius: 5,
    width: 134
  },

  md3FontStyles: {
    lineHeight: 32
  },
  fontStylestab: {
    fontWeight: '800',
    fontSize: 24
  },
  fontFamily: {
    fontFamily: 'Poppins'
  }
});

export default MyContentData;
