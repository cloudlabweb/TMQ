import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, FONT } from '../assets'

const English_comp = () => {
  return (
    <>
    <View style={[styles.wrapper, styles.surahTextContainer]}>
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
      key={Math.random()}
      style={styles.surah_story}
      selectable={textSelection}
      onPress={selectText}>
      {data.surahStory}
    </Text>
  </>
  )
}

export default English_comp

const styles = StyleSheet.create({
    surahTextContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
      },
      wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
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
        color: 'red',
        marginBottom: 15,
        textAlign: 'center',
      },
      surahText: {
        fontFamily: FONT.minionReg,
        fontSize: 25,
        lineHeight: 35,
        color: COLOR.black,
        textAlign: 'left',
        marginBottom: 15,
      },
      horizontalLine: {
        height: 1.6,
        width: 280,
        backgroundColor: '#000080',
        marginTop: 5,
        marginBottom: 10,
      },
})