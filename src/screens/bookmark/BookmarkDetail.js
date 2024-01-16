import {Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {COLOR, FONT} from '../../assets';
import {selectFontSize, selectArabicFontSize} from '../../redux/fontsSizeSlice';
import {useDispatch, useSelector} from 'react-redux';

const BookmarkDetail = props => {
  const {surahNum, surahName, bookmarkArabic, title, bookmarkTranslation} =
    props.route.params.item;

     // get dynamic font size
  const getFontSize = useSelector(selectFontSize);
  const getArabicFontSize = useSelector(selectArabicFontSize);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.inputsContainer}>
      <Text style={[styles.arabicText, {color: COLOR.primary}]}>
        {surahNum}.{surahName}
      </Text>
      <Text style={[styles.arabicText, {marginBottom: 30, fontSize:getArabicFontSize}]}>
        {bookmarkArabic}
      </Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.translation, {
    fontSize: getFontSize,}]}>{bookmarkTranslation}</Text>
    </ScrollView>
  );
};

export default BookmarkDetail;

const styles = StyleSheet.create({
  inputsContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: COLOR.white,
  },
  arabicText: {
    fontSize: 40,
    textAlign: 'center',
    color: COLOR.black,
    fontFamily: FONT.noorehuda,
    // lineHeight:60
  },
  translation: {
    fontFamily: FONT.minionReg,
    lineHeight: 35,
    color: COLOR.black,
    textAlign: 'justify',
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    fontFamily: FONT.RobotoBold,
    color: '#ff0800',
    marginBottom: 15,
    textAlign: 'center',
  },
});
