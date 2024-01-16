import {StyleSheet, Dimensions} from 'react-native';
import {COLOR, FONT} from '../../assets/assets';
const {width, height} = Dimensions.get('screen');
// console.log("width", width, "height", height)

export const styles = StyleSheet.create({
  centerScreen: {
    flex: 9,
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    overflow: 'hidden',
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconBG: {
    height: height/5.3,
    width: width/2.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontFamily: FONT.impact,
    textAlign: 'center',
    letterSpacing: 0.3,
    fontSize: 18,
    color: COLOR.primary,
  },
  btnNormal: {
    borderRadius: 20,
    backgroundColor: COLOR.white,
    borderColor: COLOR.secondary,
    borderWidth: 4,
  },
  btnPress: {
    borderColor: COLOR.primary,
    borderWidth: 4,
    borderRadius: 20,
  },
  dynamicIconComp: {
    margin:11,
  },
  // HEADER
  // topBar: {
  //   backgroundColor: COLOR.primary,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingBottom: 15,
  // },
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
    fontSize: 20,
    fontWeight: '300',
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
