import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import React from 'react';
import {COLOR, FONT} from '../assets/assets';

const Header = () => {
  return (
    <View>
      <StatusBar animated={true} backgroundColor={COLOR.primary} />
      <View style={styles.topBar}>
        <View style={styles.headingWraper}>
          <Text style={styles.heading}>
            The Majestic
            <Text style={{color: COLOR.secondary}}> Quran</Text>
          </Text>
          <Text style={styles.tagLine}>A Plain English Translation</Text>
          <View style={styles.horizontalLine} />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  topBar: {
    // backgroundColor: COLOR.primary,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingBottom: 15,
  },
  headingWraper: {
    top: 4,
  },
  heading: {
    color: COLOR.white,
    fontSize: 35,
    fontFamily: 'Centaur',
  },
  tagLine: {
    color: COLOR.white,
    fontSize: 18,
    fontFamily: FONT.RobotoLight,
    alignSelf: 'center',
    marginTop: -4,
  },
  horizontalLine: {
    height: 1.5,
    width: 140,
    backgroundColor: COLOR.white,
    alignSelf: 'center',
    marginTop: 8,
  },
});
