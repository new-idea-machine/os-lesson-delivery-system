import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const MenuInput = ({
  placeholder,
  symbol,
  required,
  hidden,
  setter,
  right
}) => {
  const [isItHidden, setIsItHidden] = useState();

  useEffect(() => {
    if (hidden === 'true') {
      setIsItHidden(true);
    } else {
      setIsItHidden(false);
    }
  }, []);

  let showRightIcon;
  if (right) {
    showRightIcon = (
      <TextInput.Icon
        icon={
          right && isItHidden
            ? 'eye-off-outline'
            : right && !isItHidden
            ? 'eye-outline'
            : false
        }
        iconColor='#979797'
        onPress={() => {
          right ? setIsItHidden(!isItHidden) : null;
        }}
      />
    );
  } else {
  }

  return (
    <>
      <TextInput
        label={
          <Text>
            {placeholder}
            {required ? <Text style={{ color: 'red' }}> *</Text> : null}
          </Text>
        }
        style={styles.inputContainer}
        mode='outlined'
        secureTextEntry={isItHidden}
        theme={{
          colors: { onSurfaceVariant: '#979797' },
          fonts: { labelMedium: { fontFamily: 'Poppins' } }
        }}
        left={<TextInput.Icon icon={symbol} iconColor='#979797' />}
        right={showRightIcon}
        outlineColor='transparent'
        activeOutlineColor='#00B0FC'
        letterSpacing='5'
        onChangeText={(text) => setter(text)}
      />
    </>
  );
};

export default MenuInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    width: 266,
    fontFamily: 'Poppins',
    fontSize: 12,
    backgroundColor: '#EFEFEF'
  }
});
