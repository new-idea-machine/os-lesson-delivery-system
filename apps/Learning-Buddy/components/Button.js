import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../config/colors';

const Button = ({ title, onPress, style }) => {
  console.log('INSIDE BUTTON');
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    width: '100%'
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default React.memo(Button);
