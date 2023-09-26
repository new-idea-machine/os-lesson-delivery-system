import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Paragraph } from 'react-native-paper';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';

export const HomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const { signOut, user } = auth;

  return (
    <SafeAreaView>
      <ScrollView style={localStyles.container}>
        <Text style={localStyles.h1}>Home</Text>
        <View>
          <Text style={localStyles.h2}>My Progress</Text>
          <View style={localStyles.statsContainer}>
            <View style={localStyles.card}>
              <Text style={localStyles.quizTakenValue}>6</Text>
              <Text style={localStyles.cardText}>Quizzes</Text>
              <Text style={localStyles.cardText}>Taken</Text>
            </View>
            <View style={localStyles.card}>
              <Text style={localStyles.correctnessValue}>56</Text>
              <Text style={localStyles.cardText}>Correctness</Text>
              <Text style={localStyles.cardText}>Rating</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={localStyles.h2}>New Quiz</Text>
          <BigButton
            buttonColor={colors.green}
            textColor={colors.black}
            content={'Create new quiz'}
            onPress={() => navigation.navigate('New Quiz Screen2')}
          />
        </View>
        <View>
          <Text style={localStyles.h2}>My Content</Text>
          <View>
            <View style={localStyles.filterContainer}>
              <Text > By Category</Text>
              <Text style={localStyles.filterStyling}> Filter</Text>
            </View>
            <View style={localStyles.folderContainer}>
              <Text style={localStyles.folderItem}>PHP</Text>
              <Text style={localStyles.folderItem}>Javascript</Text>
              <Text style={localStyles.folderItem}>Java</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginHorizontal: 30
  },
  h1: {
    fontFamily: 'Black',
    fontSize: 18,
    letterSpacing: 2,
    marginVertical: 20
  },
  h2: {
    fontFamily: 'SemiBold',
    fontSize: 16,
    letterSpacing: 2,
    marginVertical: 10
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 30,
    height: '100%',
    marginHorizontal: 30
  },
  quizTakenValue: {
    fontSize: 65,
    color: colors.yellow
  },
  correctnessValue: {
    fontSize: 65,
    color: colors.blue
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
    padding: 10
  },
  cardText: {
    fontSize: 12,
    color: colors.grey,
    letterSpacing: 1
  },
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, 
    marginHorizontal: 10,
  },
  filterStyling: {
    fontSize: 15,
    fontFamily: 'Bold',
    color: colors.green,
  },
  folderContainer: {
    flex: 1,
    gap: 15, 
    marginHorizontal: 30,
    marginVertical: 15
  },
  folderItem: {
    fontFamily: 'SemiBold',
    fontSize: 12, 
    color: colors.grey,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10, 
    paddingHorizontal: 30,
    paddingVertical: 15,
    letterSpacing: 2
  }
});
