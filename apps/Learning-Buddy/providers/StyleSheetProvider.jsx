import { StyleSheet } from 'react-native';
import React, { createContext } from 'react';

export const StyleSheetContext = createContext(null);

export default function StyleSheetProvider({ children }) {
  return (
    <StyleSheetContext.Provider value={styles}>
      {children}
    </StyleSheetContext.Provider>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontFamily: 'Bold',
    alignSelf: 'center',
    marginTop: 35,
    letterSpacing: 2
  },
  menuBackButton: {
    fontSize: 15,
    fontFamily: 'Poppins',
  },
  tinyLogo: {
    width: 24,
    height: 24,
    alignSelf: 'center'
  },
  inputLabel: {
    // marginBottom: 8,
    // color: colors.blue,
    fontSize: 14,
    fontWeight: '500'
  }
});
