import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Paragraph } from 'react-native-paper';
import BigButton from '../components/BigButton';
import { colors } from '../config/colors';
import {
  createFile,
  deleteFile,
  listAllFiles,
  listFileById,
  updateFile
} from '../util/filesAPI';

export const HomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const { signOut, user, session } = auth;

  return (
    <View style={localStyles.container}>
      <Text>Hi {user.user_metadata.fullName}</Text>
      <Paragraph>Please use the drawer menu from the top left corner</Paragraph>
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Create new quiz'}
        onPress={() => navigation.navigate('New Quiz Screen2')}
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'Sign Out'}
        onPress={() => signOut()}
      />

      {/*File Crud test buttons to be removed after testing */}
      {/* <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'test list files'}
        onPress={() => listAllFiles(session)}
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'update file Id3'}
        onPress={() => updateFile(3, 'new name1', 'new text2', session)}
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'delete file Id3'}
        onPress={() => deleteFile(3, session)}
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'get file Id4'}
        onPress={() => listFileById(4, session)}
      />
      <BigButton
        buttonColor={colors.green}
        textColor={colors.black}
        content={'create file'}
        onPress={() => createFile('some name', 'some text', session)}
      />
    </View> */}
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  }
});
