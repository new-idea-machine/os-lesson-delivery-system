import React, { useCallback, useContext, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FileCard from '../components/FileCard';

import BigButton from '../components/BigButton';

import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../config/colors';
import { AuthContext } from '../providers/AuthProvider';
import { deleteFile, listAllFiles } from '../util/filesAPI';

// Define the SaveDocumentsScreen component
export const SaveDocumentsScreen = ({ navigation }) => {
  // Initialize state variables
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textParam, setTextParam] = useState(null);
  const [allQuizFiles, setAllQuizFiles] = useState([]);

  // Access the authentication context
  const auth = useContext(AuthContext);
  const { session } = auth;

  // Use the useFocusEffect hook to fetch data when the component mounts
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const allFiles = await listAllFiles(session);
          setAllQuizFiles(allFiles);
        } catch (error) {
          console.log('Error fetching files', error);
        }
      };
      fetchData();
    }, [session])
  );

  // Modal visibility toggle function
  const toggleModalVisibility = () => setModalVisible((prev) => !prev);
  // Submit text context function
  const SubmitTextParam = () => {
    try {
      navigation.navigate('New Quiz Screen2', {
        screen: 'New Quiz Stack',
        params: {
          screen: 'New Quiz Screen',
          params: {
            fileId,
            textParam,
            fileNameParam: selectedFile
          }
        }
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'My Save Documents' }]
      });
    } catch (error) {
      console.log('Error navigating:', error);
    }
  };

  // Define a function to show the modal
  const ShowCardModal = () => {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          toggleModalVisibility();
        }}
      >
        <View style={localStyles.modal}>
          <View style={localStyles.modalContent}>
            <View style={localStyles.modalClose}>
              <IconButton
                icon='close'
                size={20}
                onPress={toggleModalVisibility}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={localStyles.modalTitle}>{selectedFile}</Text>
              <ScrollView
                padding={null}
                style={{ maxWidth: '100%', maxHeight: '65%' }}
              >
                <Text
                  style={{
                    marginBottom: 5,
                    color: colors.grey
                  }}
                >
                  {textParam}
                </Text>
              </ScrollView>
            </View>
            <View style={localStyles.modalButtonsContainer}>
              <BigButton
                buttonColor={colors.green}
                textColor={colors.black}
                content={'Use To Create Quiz'}
                onPress={() => {
                  SubmitTextParam();
                }}
              />
              <Pressable
                style={[
                  {
                    marginTop: 20
                  }
                ]}
                onPress={() => {
                  deleteFile(fileId, session);
                  const updatedFileList = allQuizFiles.filter(
                    (file) => file.id != fileId
                  );
                  setAllQuizFiles(updatedFileList);
                  setModalVisible(false);
                  console.log('✅ Delete Document', fileId);
                }}
              >
                <Text
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Delete Document
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

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
            {allQuizFiles &&
              allQuizFiles.map((file) => (
                <FileCard
                  key={file.id}
                  title={file.name}
                  right={() => (
                    <IconButton
                      icon='dots-vertical'
                      onPress={() => {
                        setFileId(file.id);
                        setSelectedFile(file.name);
                        setTextParam(file.text);
                        setModalVisible(true);
                      }}
                    />
                  )}
                />
              ))}
            {modalVisible && <ShowCardModal />}
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
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 35,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 100,
    width: '85%',
    maxHeight: '75%'
  },
  modalClose: { alignItems: 'flex-end' },
  modalTitle: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 20
  },
  modalButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  }
});
