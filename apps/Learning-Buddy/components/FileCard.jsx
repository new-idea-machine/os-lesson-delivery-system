import React from 'react';
import { StyleSheet } from 'react-native';

import { Card } from 'react-native-paper';

import { colors } from '../config/colors';

const FileCard = ({ onPress, ...props }) => {
  return (
    <Card mode='outlined' style={localStyles.card}>
      <Card.Title
        titleStyle={localStyles.title}
        subtitleStyle={localStyles.subtitle}
        {...props}
      />
    </Card>
  );
};

export default FileCard;

const localStyles = StyleSheet.create({
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
