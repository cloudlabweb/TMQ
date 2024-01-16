import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

import {COLOR, ICONS} from '../assets';

const SearchInput = (props) => {
   
  return (
    <View style={styles.inputContainer}>
    <ICONS.SearchIcon/>

      <TextInput
        {...props}
        placeholderTextColor={COLOR.black}
        style={styles.input}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor:COLOR.yellow,
    height: 50,
    borderRadius: 9,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 12,
  },
  input: {
    marginLeft: 15,
    fontSize:22,
    width: '90%',
    color: COLOR.navyBlue,
  },
});
