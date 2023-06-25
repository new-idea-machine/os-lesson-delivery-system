import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import React, {useContext} from 'react'
import { StyleSheetContext } from '../providers/StyleSheetProvider';


const MenuBackButton = ({navigation}) => {
    const styles = useContext(StyleSheetContext);

    const goBack = () => {
        navigation.dispatch(CommonActions.goBack())
    }

  return (
    <View style={localStyles.viewStyle}>
      <Pressable style={{flexDirection:'row'}} onPress={goBack} android_ripple={{color: '#3CC982', borderless:true, radius:100}}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/baseline_chevron_left_black_18dp.png')
              }
            />
            <Text style={styles.menuBackButton}>Back</Text>
          </Pressable>
    </View>
  )
}

export default MenuBackButton

const localStyles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    alignItems:'flex-start',
    position:'absolute',
    paddingLeft:10
  }
})