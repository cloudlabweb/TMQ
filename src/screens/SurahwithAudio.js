import { FlatList, View, Text, Image,TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SurahHeaderArabic, SurahTextArabic } from '../components/Arabic_comp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ASSETS, COLOR, FONT } from '../assets';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import AudioPlayer from '../components/AudioPlayer';
import NewAudioPlayer from '../components/NewAudioPlayer';
import { useSelector, useDispatch } from 'react-redux';
// import { selectLanguage } from '../redux/languageSlice'
import { selectFontSize, selectArabicFontSize } from '../redux/fontsSizeSlice'
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';


let ayatIndex = 0
let mockData = []
let apiCall = true;
const SurahwithAudioTrans = props => {

  //console.log('Param > ', props?.testData)
  console.log('Param > ', props?.testData)
  let data = props?.data
  const ayahNumber = props?.ayahNumber
  console.log('ayahhhh Number > ', data)


  // return
  // let mockData = []
  // mockData.push(data)

  // console.log('Mock Data  > ', mockData)
  // const getStoreLanguage = useSelector();
  const [surahData, setSurahData] = useState([]);
  // const [ayatIndex, setAyatIndex] = useState(0);
  const [id, setID] = useState(0);
  // get dynamic font size
  const getFontSize = useSelector(selectFontSize);
  const getArabicFontSize = useSelector(selectArabicFontSize);
  const [surahNum, setSurahNum] = useState();
  const [surahName, setSurahName] = useState();
  // const [apiCall, setApiCall] = useState(true);

  const flatListRef = useRef();
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [scrollval, setscrollval] = useState(0.050146858869044755);


  const handleScroll = event => {
    let yOffset = event.nativeEvent.contentOffset.y;
    let contentHeight = event.nativeEvent.contentSize.height;
    let value = yOffset / contentHeight;
  };
  // const scrollToPosition = () => {
  //   flatListRef.current?.scrollToOffset({ offset: 2, animated: true });
  // };

  useEffect(() => {
    //scrollToPosition();
    if (apiCall) {
      //data = data[ayatIndex]
      console.log('outttherreee', mockData)
      mockData.push(data)
      setSurahData(mockData)
      console.log('outttherreee ----------------', surahData)

      apiCall = false
    } else {
      ayatIndex = 0;
      mockData = []

      console.log(' ----------------', mockData)
      mockData.push(data)
      setSurahData(mockData)

    }
  }, [flatListRef.current?.offset]);


  const setNewAyat = () => {
    mockData = []
    ayatIndex = ayatIndex + 1;

    data = props?.testData[ayatIndex]


    console.log('data to be pushed ------------', props?.testData[ayatIndex])

    mockData.push(data)

    console.log('ayat > ', ayatIndex)
    console.log('ayatData > ', mockData)


    setSurahData(mockData)
  }

  const setDecreaseAyat = () => {
    mockData = []
    ayatIndex = ayatIndex - 1;

    data = props?.testData[ayatIndex]

    console.log('data to be  ------------', props?.testData[ayatIndex])
    mockData.push(data)

    setSurahData(mockData)
  }


  const transTafseer = (list) => {
    // switch (getStoreLanguage.selectedLanguage) {
    //   case "English":
    //     return list?.ayat_english
    //     break;

    //   case "Urdu":
    //     return list?.ayat_urdu
    //     break;

    //   case "Sindhi":
    //     return list?.ayat_sindhi
    //     break;

    //   case "Pashto":
    //     return list?.ayat_pashto
    //     break;

    //   case "Balochi":
    //     return list?.ayat_balochi
    //     break;

    //   default:
    //     return list?.ayat_english
    //     break;
    // }
  }
  const transAyah = (list) => {
    // switch (getStoreLanguage.selectedLanguage) {
    //   case "English":
    //     return list?.ayat_english
    //     break;

    //   case "Urdu":
    //     return list?.ayat_urdu
    //     break;

    //   case "Sindhi":
    //     return list?.ayat_sindhi
    //     break;

    //   case "Pashto":
    //     return list?.ayat_pashto
    //     break;

    //   case "Balochi":
    //     return list?.ayat_balochi
    //     break;

    //   default:
    //     return list?.ayat_english
    //     break;
    // }
  }
  
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SurahHeaderArabic
            surahNumber={surahData && props?.testData?.surah_number}
            surahName={surahData && props?.testData?.surah_name}
            surahAyats={surahData && props?.testData?.surah_ayats}
            surahNameMean={props?.testData?.surahNameMean}
            getFontSize={getFontSize}
            getFontSizeArb={getArabicFontSize}
            //bismillahShareef={props?.testData?.surahStoryHeading}
            ayahNumber={surahData && props?.testData?.surah_number}
        />
      
        <View style={{flex:1,alignItems:'center'}}>
          <Image
              style={{width: Dimensions.get('window').width / 2.2, height: Dimensions.get('window').width / 2.5 }}
              source={ASSETS.audio}
            />
        </View>
      <NewAudioPlayer
        ayatID={props?.testData?.surah_number}
        increaseAyat={() => setNewAyat()}
        decreaseAyat={() => setDecreaseAyat()}
        ayatData={props?.testData}
        surahName={props?.testData?.surah_name}
      />
      </View>
    </>
  );
};

export default SurahwithAudioTrans;
