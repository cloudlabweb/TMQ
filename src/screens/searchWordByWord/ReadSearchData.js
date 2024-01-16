import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {COLOR, FONT} from '../../assets';
import {selectFontSize} from '../../redux/fontsSizeSlice';
import {useSelector} from 'react-redux';

const ReadSearchData = props => {
  const data = props?.route?.params?.data;
  const getFontSize = useSelector(selectFontSize);

  return (
    <ScrollView contentContainerStyle={{padding: 10}} style={{flex: 1, backgroundColor:"#fff"}}>
      <Text
        style={[
          styles.surahText,
          {fontSize: getFontSize, lineHeight: getFontSize < 30 ? 35 : 45},
        ]}
        selectable={true}>
        {data.translation}
      </Text>
    </ScrollView>
  );
};

export default ReadSearchData;

const styles = StyleSheet.create({
  surahText: {
    fontFamily: FONT.minionReg,
    lineHeight: 35,
    color: COLOR.black,
    textAlign: 'justify',
    marginBottom: 15,
  },
});
