import { View, Text, Pressable, Image } from 'react-native'
import React, {useContext} from 'react'
import { StyleSheetContext } from '../providers/StyleSheetProvider';


const MenuBackButton = ({navigation}) => {
    const styles = useContext(StyleSheetContext);

    const goBack = () => {
        navigation.navigate('Test Screen')
    }

  return (
    <View>
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