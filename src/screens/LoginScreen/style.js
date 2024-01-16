import {COLOR, FONT} from '../../assets';

const {StyleSheet, Dimensions} = require('react-native');

export const styles = StyleSheet.create({
  manContainer: {
    flex: 1,
    backgroundColor: COLOR.white
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.navyBlue,
    height: '15%',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLOR.white,
  },
  colorText: {
    color: COLOR.yellow,
  },
  text: {
    fontSize: 25,
    color: 'white',
  },
  loginMainContainer: {
    height:610,
    //paddingHorizontal: 0,
    width: Dimensions.get('window').width - 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnContainer: {
    flexDirection: 'row',
    //width: '100%',
    justifyContent: 'space-around',
    marginVertical: 15,
    alignItems: 'center',
  },
  title: {
    height:75,
    fontWeight: '700',
    color: COLOR.navyBlue,
    fontSize: 40,
  },
  forgetContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  forgetText: {
    marginVertical: 12,
    fontSize: 19,
    fontWeight: '700',
    color: COLOR.red,
  },
  inputContainer: {
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  noAccountText: {
    fontSize:  19,
    fontWeight: '500',
    marginLeft: 10,
    color: COLOR.navyBlue
  },
});
