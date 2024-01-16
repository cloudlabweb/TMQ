import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../assets';

const SearchBarTop = (props) => {
  return (
    <View style={styles.searchNotes}>
      <FontAwesome5
        name="search"
        size={18}
        style={{color: COLOR.primary, marginRight: 7}}
      />
      <TextInput
        placeholder="Search here"
        onChangeText={props.searchHandler}
        style={styles.searchInput}
        placeholderTextColor={'#0015'}
      />
    </View>
  );
};

export default SearchBarTop;

const styles = StyleSheet.create({
  searchNotes: {
    backgroundColor: COLOR.secondary,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    fontSize: 18,
    color: COLOR.primary,
    padding: 7,
    left: 7,
    // paddingLeft:15,
    // borderColor:COLOR.primary,
    // borderLeftWidth:1,
    width: '90%',
  },
});
