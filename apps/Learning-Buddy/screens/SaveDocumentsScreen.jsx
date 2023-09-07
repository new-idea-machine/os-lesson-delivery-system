import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { colors } from '../config/colors';

export const SaveDocumentsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={localStyles.container}>
          <View>
            <Text style={localStyles.pageTitle}>Save Documents</Text>
          </View>
          <View style={localStyles.cardContainer}>
            <Card mode='outlined' style={localStyles.card}>
              <Card.Title
                title='filename1.txt'
                subtitle='# of days left'
                titleStyle={localStyles.title}
                subtitleStyle={localStyles.subtitle}
                right={() => (
                  <IconButton icon='dots-vertical' onPress={() => {}} />
                )}
              />
            </Card>
            <Card mode='outlined' style={localStyles.card}>
              <Card.Title
                title='filename2.txt'
                subtitle='# of days left'
                titleStyle={localStyles.title}
                subtitleStyle={localStyles.subtitle}
                right={() => (
                  <IconButton icon='dots-vertical' onPress={() => {}} />
                )}
              />
            </Card>
            <Card mode='outlined' style={localStyles.card}>
              <Card.Title
                title='filename3.txt'
                subtitle='# of days left'
                titleStyle={localStyles.title}
                subtitleStyle={localStyles.subtitle}
                right={() => (
                  <IconButton icon='dots-vertical' onPress={() => {}} />
                )}
              />
            </Card>
            <Card mode='outlined' style={localStyles.card}>
              <Card.Title
                title='filename4.txt'
                subtitle='# of days left'
                titleStyle={localStyles.title}
                subtitleStyle={localStyles.subtitle}
                right={() => (
                  <IconButton icon='dots-vertical' onPress={() => {}} />
                )}
              />
            </Card>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    // letterSpacing: 2,
    fontWeight: '400'
  },
  container: {
    flex: 1,
    marginHorizontal: 35
  },
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
  cardContainer: {
    marginVertical: 20,
    marginHorizontal: 15
  },
  card: {
    marginVertical: 10,
    backgroundColor: colors.white
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400'
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    color: colors.grey
  }
});
