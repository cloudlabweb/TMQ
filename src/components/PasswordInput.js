import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLOR, ICONS} from '../assets';
import { useState } from 'react';

const  PasswordInput = props => {
  const [showPass, setPassVisible] = useState(false)

  const iconPress = () => {
    setPassVisible(!showPass)
  }
  return (
    <View style={styles.inputContainer}>
      <FontAwesome5 name="lock" size={25} color={COLOR.navyBlue} />
      <TextInput
        {...props}
        secureTextEntry={showPass ? false : true}
        placeholderTextColor={'black'}
        style={styles.input}
      />
      <View style={{marginRight:5}}>
          <FontAwesome5 name={!showPass ? "eye-slash": "eye"} size={25} color={COLOR.navyBlue} onPress={() => iconPress()} />
      </View>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderColor:COLOR.navyBlue,
    borderWidth:2,
    height: 45,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 12,
   width:'100%'
  },
  input: {
    marginLeft: 13,
    width: '84%',
    fontSize: 19,
    color: COLOR.black,
    marginBottom: -2,
  },
});