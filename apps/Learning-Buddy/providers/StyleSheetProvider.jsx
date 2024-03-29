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
    marginTop: 60,
    letterSpacing: 2
  },
  menuBackButton: {
    fontSize: 15,
    fontFamily: 'Poppins',
    alignSelf:'center'
  },
  tinyLogo: {
    width: 24,
    height: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500'
  }
});
