import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Divider, List, SegmentedButtons } from 'react-native-paper';
import { colors } from '../config/colors';
import { AuthContext } from '../providers/AuthProvider';
import { listAllQuizes } from '../util/quizAPI';

export const MyContentScreen = () => {
  const [quizzes, setQuizzes] = useState([]);

  const auth = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    if (!auth.session) {
      return;
    }

    const data = await listAllQuizes(auth.session);

    if (data) {
      setQuizzes(data);
    }
  }, [auth.session]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handlePress = (buttonName) => {
    setActiveButton(buttonName);
    fetchData();
  };

  const QuizItem = useCallback(({ title, description }) => {
    return (
      <List.Item
        title={title}
        description={description}
        rippleColor={colors.green}
        right={() => <List.Icon color={colors.black} icon='arrow-right' />}
        onPress={() => {}}
      />
    );
  });

  const SortingButton = useCallback(({ sortValue, setSortValue }) => {
    return (
      <SegmentedButtons
        value={sortValue}
        onValueChange={setSortValue}
        buttons={[
          {
            value: 'NewToOld',
            label: 'Newest to Oldest',
            icon: 'chevron-up',
            style: { flex: 1 },
            showSelectedCheck: true,
            testID: 'Newest to Oldest'
          },
          {
            value: 'OldToNew',
            label: 'Oldest to Newest',
            icon: 'chevron-down',
            style: { flex: 1 },
            showSelectedCheck: true,
            testID: 'Oldest to Newest'
          }
        ]}
        density='regular'
        style={localStyles.segmentedButtonGroup}
      />
    );
  });

  return (
    <View style={localStyles.container}>
      <Text className='header' style={localStyles.pageTitle}>
        My Content
      </Text>
      <SortingButton />
      <Divider style={localStyles.divider} />
      <List.Section>
        <List.Subheader>All Quiz</List.Subheader>
        <QuizItem title='First Item' description='Item description' />
        <QuizItem title='Second Item' description='Item description' />
        <QuizItem title='Third Item' description='Item description' />
        <QuizItem title='Forth Item' description='Item description' />
        <QuizItem title='Fifth Item' description='Item description' />
        <QuizItem title='Sixth Item' description='Item description' />
      </List.Section>
      <View style={localStyles.containerPagination}>
        <Button style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign
            name='left'
            size={24}
            color='#979797'
            style={{ lineHeight: 30 }}
          />
          <Text style={{ ...localStyles.textPagination }}>Last Page</Text>
        </Button>
        <View
          style={{ flex: 0.7, justifyContent: 'center', flexDirection: 'row' }}
        >
          <Text style={localStyles.textPagination}>1</Text>
          <Text style={localStyles.textPagination}>/</Text>
          <Text style={localStyles.textPagination}>2</Text>
        </View>
        <Button style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={localStyles.textPagination}>Next Page</Text>
          <AntDesign name='right' size={24} color='#979797' />
        </Button>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35
  },
  containerPagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontFamily: 'Poppins',
    height: '20%'
  },
  divider: { marginVertical: 10 },
  pageTitle: {
    marginTop: 20,
    marginBottom: 10,
    color: colors.black,
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 27,
    alignSelf: 'flex-start'
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 23
  },
  textPagination: {
    fontWeight: '400',
    fontSize: 12,
    color: '#979797',
    fontFamily: 'Poppins'
  },
  segmentedButtonGroup: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    paddingVertical: 20
  }
});
