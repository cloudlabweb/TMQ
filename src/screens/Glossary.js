import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {QuranData} from '../components/QuranData';
import {COLOR, FONT} from '../assets';
import {selectFontSize} from '../redux/fontsSizeSlice';
import { useSelector} from 'react-redux';

const Glossary = props => {
  const [textSelection, setTextSelection] = useState(false);

  const filteredData = QuranData.find((item) => item?.surah_number === props?.route?.params?.surah);
  const data = props?.route?.params?.data ? props?.route?.params?.data : filteredData;
  // const data = props?.route?.params?.data;
  //console.log(data);

  const selectText = () => {
    if (textSelection !== '') {
      return setTextSelection(true);
    }
  };

  // Dynamic FontSize
  const getFontSize = useSelector(selectFontSize);

  return (
    <>
      <View style={{flex: 1, backgroundColor:"#fff"}}>
        <FlatList
          data={data.groups}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return item.refrences.map(e => {
              return (
                <View style={styles.surahTextContainer}>
                  <Text
                    style={styles.heading}
                    selectable={textSelection}
                    key={Math.random()}
                    onPress={selectText}>
                    Group: {item.group_no}
                    {e.title}
                  </Text>
                  {/* <View style={styles.horizontalLine} /> */}
                  <Text
                    style={[styles.surahText, {fontSize:getFontSize,  lineHeight: getFontSize < 30 ? 35 : 45,}]}
                    selectable={textSelection}
                    key={Math.random()}
                    onPress={selectText}>
                    {e.detail}
                  </Text>
                </View>
              );
            });
          }}
        />
      </View>
    </>
  );
};

export default Glossary;

const styles = StyleSheet.create({
  surahTextContainer: {
    flex:1,
    padding: 10,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 25,
    fontFamily: FONT.RobotoBold,
    color: COLOR.primary,
  },
  surahText: {
    fontFamily: FONT.minionReg,
    color: COLOR.black,
  },
  horizontalLine: {
    height: 1.6,
    width: 150,
    backgroundColor: COLOR.primary,
    marginBottom: 10,
  },
});
