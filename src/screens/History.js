import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLOR, FONT} from '../assets';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import {selectFontSize, selectArabicFontSize} from '../redux/fontsSizeSlice';
import { useSelector} from 'react-redux';
import { QuranData } from '../components/QuranData';

const History = props => {
  const {width} = useWindowDimensions();
  const systemFonts = [
    ...defaultSystemFonts,
    'MinionPro-Semibold',
    'MinionPro-Regular',
  ];
  const filteredData = QuranData.find((item) => item?.surah_number === props?.route?.params?.surah);
  const data = props?.route?.params?.data ? props?.route?.params?.data : filteredData;
  // const data = props?.route?.params?.data;

// Dynamic FontSize
  const getFontSize = useSelector(selectFontSize);

  return (
    <>
      <View style={{flex: 1, backgroundColor:"#fff"}}>
        <FlatList
          data={[data]}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={() => {
          //   return (
          //     <>
          //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
          //         <Text style={[styles.surahText, {fontSize: 20}]}>
          //           ({data?.surah_number})
          //         </Text>
          //         <Text style={styles.surahText}>
          //           {data?.surahNameEng.slice(6)}
          //         </Text>
          //       </View>
          //     </>
          //   );
          // }}
          renderItem={item => {
            // Render HTML Content in React Native
            const surahDetail = {html: data.surahBasicDetail};
            return (
              <RenderHTML
                source={surahDetail}
                key={Math.random()}
                contentWidth={width}
                baseStyle={{paddingTop:20}}
                tagsStyles={{
                  h2: {
                    color: COLOR.primary,
                    fontSize: '25px',
                    fontFamily: FONT.RobotoBold,
                  },
                  body: {
                    color: '#000',
                    fontSize: getFontSize,
                    margin: 10,
                    lineHeight: getFontSize < 30 ? 35 : 45,
                    fontFamily: 'MinionPro-Regular',
                    textAlign:"justify",
                  },
                }}
                systemFonts={systemFonts}
                
              />
            );
          }}
        />
      </View>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  surahTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 15,
  },
  surahText: {
    fontFamily: FONT.RobotoBold,
    fontSize: 35,
    marginVertical: 10,
    marginHorizontal: 10,
    color: COLOR.primary,
  },
});
