import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../config/colors';

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
        iconColor={colors.gray}
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
            {required ? <Text style={{ color: colors.red }}> *</Text> : null}
          </Text>
        }
        style={localStyles.inputContainer}
        mode='outlined'
        secureTextEntry={isItHidden}
        theme={{
          colors: { onSurfaceVariant: colors.gray },
          fonts: { labelMedium: { fontFamily: 'Poppins' } }
        }}
        left={<TextInput.Icon icon={symbol} iconColor={colors.gray} />}
        right={showRightIcon}
        outlineColor='transparent'
        activeOutlineColor={colors.lightBlue}
        letterSpacing='5'
        onChangeText={(text) => setter(text)}
      />
    </>
  );
};

export default MenuInput;

const localStyles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    width: 266,
    fontFamily: 'Poppins',
    fontSize: 12,
    backgroundColor: colors.lightGray
  }
});
