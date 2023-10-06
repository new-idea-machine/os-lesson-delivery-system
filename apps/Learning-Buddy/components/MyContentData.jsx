import React, { useState, useContext } from 'react';
import { listAllQuizes } from '../util/quizAPI';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../providers/AuthProvider';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../config/colors';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

function MyContentData() {
  const [quizzes, setQuizzes] = useState([]);
  const [activeButton, setActiveButton] = useState('');

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

  const handlePress = (buttonName) => {
    setActiveButton(buttonName);
    fetchData();
  };

  return (
    <View>
      <Text className='header' style={localStyles.header}>
        My Content
      </Text>
      <View style={localStyles.containertab}>
        {MyContentButtonsNames.map((buttonName) => (
          <Button
            labelStyle={[localStyles.fontStyletab, { color: textColor }]}
            mode='outlined'
            style={[
              {
                backgroundColor: activeButton === buttonName ? '#000' : '#fff'
              },
              localStyles.buttontab
            ]}
            key={buttonName}
            onPress={() => handlePress(buttonName)}
          >
            <Text
              style={[
                localStyles.fontFamily,
                {
                  color: activeButton === buttonName ? '#fff' : '#000'
                }
              ]}
            >
              {buttonName}
            </Text>
          </Button>
        ))}
      </View>
      <Divider style={localStyles.divider} />
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
      <View style={localStyles.containerpagination}>
        <Button style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign
            name='left'
            size={24}
            color='#979797'
            style={{ lineHeight: 30 }}
          />
          <Text style={{ ...localStyles.textpagination }}>Last Page</Text>
        </Button>
        <View
          style={{ flex: 0.7, justifyContent: 'center', flexDirection: 'row' }}
        >
          <Text style={localStyles.textpagination}>1</Text>
          <Text style={localStyles.textpagination}>/</Text>
          <Text style={localStyles.textpagination}>2</Text>
        </View>
        <Button style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={localStyles.textpagination}>Next Page</Text>
          <AntDesign name='right' size={24} color='#979797' />
        </Button>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  containertab: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'start',
    height: '20%'
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
    // height: '3%',
  },
  containerbodybuttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '45%'
  },
  containerpagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontFamily: 'Poppins',
    height: '20%'
  },
  divider: { marginVertical: 10 },
  header: {
    fontSize: 18,
    color: '#262626',
    fontWeight: '800',
    marginVertical: 10
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
  buttonpagination: {},
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
  },

  textpagination: {
    fontWeight: '400',
    fontSize: 12,
    color: '#979797',
    fontFamily: 'Poppins'
  },
  divider: { marginVertical: 10 }
});

export default MyContentData;
