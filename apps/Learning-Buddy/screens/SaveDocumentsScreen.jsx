import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Modal, Pressable, View, ScrollView, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import FileCard from '../components/FileCard';

import BigButton from '../components/BigButton';

import { colors } from '../config/colors';

export const SaveDocumentsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
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
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              // margin: 20,
              backgroundColor: colors.white,
              borderRadius: 15,
              padding: 35,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 3
            }}
          >
            <View style={{ alignItems: 'flex-end' }}>
              <IconButton
                icon='close'
                size={20}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <View style={{ alignItems: 'flex-start' }}>
              <Text
                style={{
                  marginBottom: 15,
                  fontWeight: 'bold',
                  fontSize: 20
                }}
              >
                filename1.txt
              </Text>
              <Text
                style={{
                  marginBottom: 5,
                  color: colors.grey
                }}
              >
                36KB
              </Text>
              <Text
                style={{
                  marginBottom: 5,
                  color: colors.grey
                }}
              >
                2023-08-10, 6:00 PM
              </Text>
              <Text
                style={{
                  marginBottom: 5,
                  color: colors.grey
                }}
              >
                1 Day Left
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20
              }}
            >
              <BigButton
                buttonColor={colors.green}
                textColor={colors.black}
                content={'Use To Create Quiz'}
                onPress={() => {
                  console.log('✅ Use To Create Quiz');
                }}
              />
              <Pressable
                style={[
                  {
                    marginTop: 20
                  }
                ]}
                onPress={() => {
                  console.log('✅ Delete Document');
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
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={localStyles.container}>
          <View>
            <Text style={localStyles.pageTitle}>Save Documents</Text>
          </View>
          <View style={localStyles.cardContainer}>
            <FileCard
              title='filename101.txt'
              subtitle='# of days left'
              right={() => (
                <IconButton
                  icon='dots-vertical'
                  onPress={() => setModalVisible(true)}
                />
              )}
            />
            <FileCard
              title='filename102.txt'
              subtitle='# of days left'
              right={() => (
                <IconButton
                  icon='dots-vertical'
                  onPress={() => setModalVisible(true)}
                />
              )}
            />
            <FileCard
              title='filename103.txt'
              subtitle='# of days left'
              right={() => (
                <IconButton
                  icon='dots-vertical'
                  onPress={() => setModalVisible(true)}
                />
              )}
            />
            <FileCard
              title='filename104.txt'
              subtitle='# of days left'
              right={() => (
                <IconButton
                  icon='dots-vertical'
                  onPress={() => setModalVisible(true)}
                />
              )}
            />
            <FileCard
              title='filename105.txt'
              subtitle='# of days left'
              right={() => (
                <IconButton
                  icon='dots-vertical'
                  onPress={() => setModalVisible(true)}
                />
              )}
            />
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
