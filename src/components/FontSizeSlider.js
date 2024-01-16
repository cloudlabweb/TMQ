import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLOR, FONT} from '../assets';
import {useDispatch, useSelector} from 'react-redux';
import {
  incEngFontSize,
  decEngFontSize,
  incArabicFontSize,
  decArabicFontSize,
  selectFontSize,
  selectArabicFontSize,
} from '../redux/fontsSizeSlice';

const FontSizeSlider = () => {
  const dispatch = useDispatch();
  const getFontSize = useSelector(selectFontSize);
  const getArabicFontSize = useSelector(selectArabicFontSize);


  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: COLOR.secondary,
        }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            getArabicFontSize < 50 ? dispatch(incArabicFontSize()) : null
          }>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>

        <Text style={styles.num}>{getArabicFontSize}</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            getArabicFontSize > 30 ? dispatch(decArabicFontSize()) : null
          }>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOR.secondary,
        }}>
        <Text
          style={[
            styles.num,
            {
              fontSize: getArabicFontSize,
              fontFamily: FONT.noorehuda,
              textAlign: 'center',
            },
          ]}>
          اَلۡحَمۡدُ لِلّٰہِ رَبِّ الۡعٰلَمِیۡنَ ۙ﴿۱﴾ الرَّحۡمٰنِ الرَّحِیۡمِ
          ۙ﴿۲﴾
        </Text>
      </View>

      {/* ====================ENGLISH==================== */}
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: COLOR.white,
        }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            getFontSize < 40 ? dispatch(incEngFontSize()) : null
          }>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>

        <Text style={styles.num}>{getFontSize}</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            getFontSize > 20 ? dispatch(decEngFontSize()) : null
          }>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOR.white,
        }}>
        <Text
          style={[
            styles.num,
            {
              fontSize: getFontSize,
              fontFamily: FONT.minionReg,
              textAlign: 'center',
              lineHeight: getFontSize < 30 ? 35 : 45
            },
          ]}>
          ¹All praises are for Allah, the Lord of the worlds.ᵃ²The Kind, the
          Caring
        </Text>
      </View>
    </View>
  );
};

export default FontSizeSlider;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 30,
    bottom: 7,
    color: '#fff',
  },
  num: {
    fontSize: 50,
    color: '#000',
  },
});
