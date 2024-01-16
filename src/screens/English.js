import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState, memo} from 'react';
import {COLOR, FONT} from '../assets';
import {useSelector} from 'react-redux';
import {selectFontSize, selectArabicFontSize} from '../redux/fontsSizeSlice';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';

const English = props => {
  const [textSelection, setTextSelection] = useState(false);
  const getFontSize = useSelector(selectFontSize);
  const getArabicFontSize = useSelector(selectArabicFontSize);
  const {width} = useWindowDimensions();

  // HTML Content (FONTS)
  const systemFonts = [
    ...defaultSystemFonts,
    'MinionPro-Semibold',
    'MinionPro-Regular',
  ];

  // Text Selection for copy/paste and share
  const selectText = () => {
    if (textSelection !== '') {
      return setTextSelection(true);
    }
  };

  //Surah Index Number
  const data = props?.route?.params?.data;

  return (
    <FlatList
      data={data.groups}
      keyExtractor={(item, index) => index.toString()}
      disableVirtualization={true}
      initialNumToRender={20}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        const surahDetail = {html: data.surahBasicDetail};
        return (
          <>
            <View style={[ styles.surahTextContainer]}>
              <View>
                <Text style={styles.introHead}>( Introduction )</Text>
                <RenderHTML
                  source={surahDetail}
                  key={Math.random()}
                  contentWidth={width}
                  tagsStyles={{
                    h2: {
                      fontSize: '25px',
                      fontFamily: FONT.RobotoBold,
                      color: COLOR.black,
                      textAlign: 'center',
                    },
                    body: {
                      margin: 15,
                      color: '#000',
                      fontSize: getFontSize,
                      fontFamily: 'MinionPro-Regular',
                      lineHeight: getFontSize < 30 ? 35 : 45,
                      textAlign: 'justify',
                    },
                  }}
                  systemFonts={systemFonts}
                />
              </View>

              <View style={styles.wrapper}>
                <Text
                  key={Math.random()}
                  style={styles.surahNumber}
                  selectable={textSelection}
                  onPress={selectText}>
                  {data.surah_number}.
                </Text>
                <Text
                  style={styles.surahName}
                  selectable={textSelection}
                  key={Math.random()}
                  onPress={selectText}>
                  {data.surahNameEng.slice(6)}
                </Text>
                <Text
                  key={Math.random()}
                  style={styles.surahAyats}
                  selectable={textSelection}
                  onPress={selectText}>
                  {data.surah_ayats}
                  {'\n'}Ayats
                </Text>
              </View>
              <Text
                key={Math.random()}
                style={styles.surahName_Mean}
                selectable={textSelection}
                onPress={selectText}>
                {data.surahNameMean}
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: getArabicFontSize,
                  textAlign: 'center',
                  fontFamily: FONT.noorehuda,
                }}
                selectable={true}
                key={Math.random()}>
                {data.surahStoryHeading}
              </Text>
              <Text
                style={[styles.surahStory, {fontSize: getFontSize}]}
                selectable={true}
                key={Math.random()}>
                {data.surahStory}
              </Text>
            </View>
          </>
        );
      }}
      renderItem={({item, index}) => {
        return (
          <View style={styles.surahTextContainer}>
            <Text
              style={styles.title}
              selectable={true}
              onPress={selectText}
              key={Math.random()}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.surahText,
                {fontSize: getFontSize, lineHeight: getFontSize < 30 ? 35 : 45},
              ]}
              selectable={true}
              onPress={selectText}
              key={Math.random()}
              >
              {item.translation}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default memo(English);

const styles = StyleSheet.create({
  surahTextContainer: {
    alignItems: 'center',
    paddingHorizontal:10,
    flexDirection:"column",
    backgroundColor:"#FFF"
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    width:"100%"
  },
  surahNumber: {
    color: COLOR.primary,
    fontSize: 20,
    fontFamily: FONT.RobotoBold,
  },
  surahAyats: {
    color: COLOR.primary,
    fontSize: 15,
    fontFamily: FONT.RobotoBold,
    textAlign: 'center',
  },
  surahName: {
    fontSize: 30,
    fontFamily: FONT.RobotoBold,
    color: COLOR.primary,
  },
  surahStory: {
    // alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONT.minionReg,
    color: COLOR.primary,
    marginVertical: 10,
    color: '#000',
  },
  surahNameEng: {
    color: COLOR.primary,
    fontFamily: FONT.RobotoMedium,
    textAlign: 'center',
    fontSize: 15,
  },
  surahName_Mean: {
    color: COLOR.primary,
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: FONT.RobotoRegular,
  },
  surah_story: {
    color: COLOR.black,
    alignSelf: 'center',
    fontSize: 19,
    fontFamily: FONT.RobotoBold,
    marginVertical: 15,
  },
  title: {
    fontSize: 25,
    fontFamily: FONT.RobotoBold,
    color: '#ff0800',
    marginBottom: 15,
    textAlign: 'center',
  },
  surahText: {
    fontFamily: FONT.minionReg,
    color: COLOR.black,
    // textAlign: 'justify',
    marginBottom: 15,
  },
  horizontalLine: {
    height: 1.6,
    width: 280,
    backgroundColor: '#000080',
    marginTop: 5,
    marginBottom: 10,
  },
  introHead: {
    fontSize: 30,
    fontFamily: FONT.RobotoBold,
    color: COLOR.primary,
    textAlign: 'center',
    marginTop: 15,
  },
});
