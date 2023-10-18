import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

export const CloseDrawerMenu = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <IconButton
        icon='close'
        onPress={() => props.navigation.closeDrawer()}
        style={{ alignSelf: 'flex-start' }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
