import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR, FONT} from '../assets';

export const SurahHeaderArabic = ({
  surahNumber,
  surahName,
  surahNameMean,
  surahAyats,
  bismillahShareef,
  bismillahShareefTrans,
  getFontSize,
  getFontSizeArb,
}) => {
  const [textSelection, setTextSelection] = React.useState(false);

  // Text Selection fro copy/paste and share
  const selectText = () => {
    if (textSelection !== '') {
      return setTextSelection(true);
    }
  };
  return (
    <>
      <View style={styles.surahTextContainer}>
        <Text style={styles.surahName} selectable={textSelection} onPress={selectText}>
          {surahAyats}
        </Text>
        <Text style={styles.surahName} selectable={textSelection} onPress={selectText}>
          {surahName.slice(4)}
        </Text>
        <Text style={styles.surahName} selectable={textSelection} onPress={selectText}>
          {surahNumber}
        </Text>
      </View>
      <Text style={styles.surahNameEng} selectable={textSelection} onPress={selectText}>
        {surahNameMean}
      </Text>
      <Text
        style={[
          styles.surahName,
          {marginVertical: 10, color: '#000', fontSize: getFontSizeArb},
        ]}
        selectable={textSelection} onPress={selectText}>
        {bismillahShareef}
      </Text>
      <Text
        style={{
          color: '#000',
          fontSize: getFontSize,
          textAlign: 'center',
          fontFamily: FONT.minionReg,
        }}
        selectable={textSelection}
        onPress={selectText}>
        {bismillahShareefTrans}
      </Text>
    </>
  );
};

export const SurahTextArabic = ({
  arabicText,
  arbfontSize,
  transTitle,
  trans,
  engFontSize,
}) => {
  const [textSelection, setTextSelection] = React.useState(false);

  // Text Selection fro copy/paste and share
  const selectText = () => {
    if (textSelection !== '') {
      return setTextSelection(true);
    }
  };

  return (
    <>
      <Text
        style={[styles.surahText, {fontSize: arbfontSize}]}
        selectable={textSelection}
        onPress={selectText}>
        {arabicText}
      </Text>

      {/* Translation */}
      <View
        style={{
          marginTop: transTitle ? 30 : -45,
        }}>
        <Text
          style={styles.title}
          selectable={textSelection}
          onPress={selectText}>
          {transTitle}
        </Text>
        <Text
          style={[
            styles.translation,
            {fontSize: engFontSize, lineHeight: engFontSize < 30 ? 35 : 45},
          ]}
          selectable={textSelection}
          onPress={selectText}>
          {trans}
        </Text>
      </View>
    </>
  );
};


export const ParaTextArabic = ({
  arabicText,
  arbfontSize,
  transTitle,
  trans,
  engFontSize,
  surah,
  getFontSize,
  getFontSizeArb,
}) => {
  const [textSelection, setTextSelection] = React.useState(false);

  // Text Selection fro copy/paste and share
  const selectText = () => {
    if (textSelection !== '') {
      return setTextSelection(true);
    }
  };

  return (
    <> 
    {surah && Object.keys(surah).length > 0
    ? (<>
      <View style={styles.surahTextContainer}>
        <Text style={styles.surahName} selectable={textSelection} onPress={selectText}>
          {surah?.surah_ayats}
        </Text>
        <Text style={styles.surahName} selectable={textSelection} onPress={selectText}>
          {surah?.arabic_name ? surah?.arabic_name : ''}
        </Text>
        <Text style={styles.surahName} selectable={textSelection} onPress={selectText}>
          {surah?.surah_number}
        </Text>
      </View>
      <Text style={styles.surahNameEng} selectable={textSelection} onPress={selectText}>
        {surah?.title}
      </Text>
      <Text
        style={[
          styles.surahName,
          {marginVertical: 10, color: '#000', fontSize: getFontSizeArb},
        ]}
        selectable={textSelection} onPress={selectText}>
        {surah?.surah_story_heading}
      </Text>
      <Text
        style={{
          color: '#000',
          fontSize: getFontSize,
          textAlign: 'center',
          fontFamily: FONT.minionReg,
        }}
        selectable={textSelection}
        onPress={selectText}>
        {surah?.surahStory}
      </Text>
      </>): null}  


      <Text
        style={[styles.surahText, {fontSize: arbfontSize}]}
        selectable={textSelection}
        onPress={selectText}>
        {arabicText}
      </Text>

      {/* Translation */}
      <View
        style={{
          marginTop: transTitle ? 30 : -45,
        }}>
        <Text
          style={styles.title}
          selectable={textSelection}
          onPress={selectText}>
          {transTitle}
        </Text>
        <Text
          style={[
            styles.translation,
            {fontSize: engFontSize, lineHeight: engFontSize < 30 ? 35 : 45},
          ]}
          selectable={textSelection}
          onPress={selectText}>
          {trans}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  surahTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  surahName: {
    alignSelf: 'center',
    fontFamily: FONT.noorehuda,
    fontSize: 40,
    color: COLOR.primary,
  },
  surahNameEng: {
    color: COLOR.primary,
    fontFamily: FONT.RobotoMedium,
    textAlign: 'center',
    fontSize: 15,
  },
  surahText: {
    fontFamily: FONT.noorehuda,
    color: COLOR.black,
    textAlign: 'center',
    marginHorizontal: 10,
  },

  title: {
    fontSize: 25,
    fontFamily: FONT.RobotoBold,
    color: '#ff0800',
    marginBottom: 15,
    textAlign: 'center',
  },
  translation: {
    fontFamily: FONT.minionReg,
    color: COLOR.black,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'left',
  },
});
