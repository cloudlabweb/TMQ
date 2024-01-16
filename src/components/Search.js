import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLOR} from '../assets/assets';

const Search = ({onSearch, placeholderText}) => {
  // SearchBAR Animation
  const animation = new Animated.Value(50);
  const {width} = Dimensions.get('window');

  const searchHandler = () => {
    Animated.spring(animation, {
      toValue: width * 0.9,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.searchContainer}>
      {/* Input Field */}
      <Animated.View style={{width: animation}}>
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor={'rgba(240,240,240,0.5)'}
          style={styles.searchInput}
          onChangeText={onSearch}
        />
      </Animated.View>
      {/* Search Button for opening Input field */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{position: 'absolute'}}
        onPress={searchHandler}>
        <View style={styles.searchBtn}>
          <FontAwesome5 name="search" size={20} style={{color: 'white'}} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Search;

// STYLING===>>>
const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    // position: 'absolute',
    alignSelf: 'center',
  },
  searchBtn: {
    backgroundColor: COLOR.secondary,
    height: 50,
    width: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 18,
    backgroundColor: 'rgba(00,00,00,0.8)',
    borderRadius: 50,
    paddingHorizontal: 20,
    color: COLOR.white,
  },
});
