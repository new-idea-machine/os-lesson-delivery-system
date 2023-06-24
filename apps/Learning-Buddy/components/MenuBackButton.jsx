import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
import { StyleSheetContext } from '../providers/StyleSheetProvider';


const MenuBackButton = ({navigation}) => {
    const styles = useContext(StyleSheetContext);

    const goBack = () => {
        navigation.navigate('Test Screen')
    }

  return (
    <View style={localStyles.viewStyle}>
      <Pressable style={{flexDirection:'row'}} onPress={goBack}>
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
    alignItems:'center',
    width:'100%',
    marginLeft:-90,
    paddingTop:10,
    backgroundColor:'red'
  }
})