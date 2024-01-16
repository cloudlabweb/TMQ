import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {COLOR, ICONS} from '../assets';

const UserInput = props => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.manIcon}>
      <FontAwesome5 name="user-alt" size={25} color={COLOR.navyBlue} />
      </View>
      <TextInput
        {...props}
        placeholderTextColor={'black'}
        style={styles.input}
      />
    </View>
  );
};

export default UserInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: COLOR.navyBlue,
    borderWidth: 2,
    height: 45,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    marginLeft: 13,
    width: '89%',
    fontSize: 19,
    color: COLOR.black,
    marginBottom: -2,
  },
  manIcon: {
    marginLeft: 12,
  },
});
