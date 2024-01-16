import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import AudioPlayer from '../components/AudioPlayer';
import {ASSETS, COLOR, FONT } from '../assets';
import SurahwithAudioTrans from '../screens/SurahwithAudio';
import { SurahHeaderArabic } from '../components/Arabic_comp';
import NewAudioPlayer from '../components/NewAudioPlayer';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {QuranData} from '../components/QuranData';
import { selectFontSize,selectArabicFontSize } from '../redux/fontsSizeSlice';
// import { selectLanguage } from '../redux/languageSlice'


let ayatIndex = 0
const ListenQuran = (props) => {
  
  
  //let filterData = props?.route?.params?.ayatsData
  
  // filterData.sort(function (x, y) {
  //   return x.surah_number - y.surah_number;
  // });

  //console.log('filter --------',filterData)

  const [surahData, setSurahData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getFontSize = useSelector(selectFontSize);
  const getArabicFontSize = useSelector(selectArabicFontSize);
  const navigation = useNavigation();
  // const getStoreLanguage = useSelector(selectLanguage);
  const [filterData, setFilterData] = useState({});
  const [apiCall, setApiCall] = useState(true);
  const [surahIndex, setSurahIndex] = useState(null);


  useEffect(() => {
    if (apiCall) {
      getAyatData()
    }
  }, [surahData.length])

  const setNewSurah = (index) => {
    //mockData = []
    
    //ayatIndex = ayatIndex + 1;

    //data = props?.testData[ayatIndex]

    let getSurahData = QuranData[index]

    console.log('data to be pushed ------------', getSurahData)
    setSurahIndex(index)
    setFilterData(getSurahData)

    //mockData.push(data)

    //console.log('ayat > ', ayatIndex)
    //console.log('ayatData > ', mockData)
    //setSurahData(mockData)
  }

  const setPreviousSurah = () => {
    //mockData = []
    ayatIndex = ayatIndex - 1;

    let getSurahData = QuranData[ayatIndex]
    //data = props?.testData[ayatIndex]

    // console.log('data to be  ------------', getSurahData)
    //mockData.push(data)
    setFilterData(getSurahData)

    //setSurahData(mockData)
  }


  const getAyatData = async () => {
    //setIsLoading(true)
    
    let ayatData = props?.route?.params?.data; 
    
    let getAyatIndex = QuranData.findIndex(function(object) {
      return object.surahNameEng === props?.route?.params?.name;
    });
    console.log('get ayat index',getAyatIndex)


    // console.log('ayat',ayatData.groups)
    let arr = [];

    arr.push(ayatData)
    setIsLoading(false)
    setSurahData(arr)
    setSurahIndex(getAyatIndex)
    setFilterData(props?.route?.params?.ayatsData)    
    // console.log('ayatsss', surahData)  
    //console.log('ayat',filterData) 
    
  }
 

  return (
    <View style={{flex:1,height: Dimensions.get('window').height, backgroundColor: '#fff'}}>
      {isLoading ?
        (<ActivityIndicator size={'large'} color={COLOR.secondary} style={{ flex: 1, alignSelf: 'center' }} />)
        :
        (      
          <FlatList
              data={surahData && surahData}              
              disableVirtualization={true}
              scrollEnabled={false}
              // style={{flex: 1}}
              //contentContainerStyle={{flex:1}}
              // refreshControl={<RefreshControl refreshing={isLoading} />}
              keyExtractor={item => item.surah_number}
              renderItem={({ item, index }) => {
              return (
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 0.5 }}>
                      <SurahHeaderArabic
                          surahNumber={surahData && filterData?.surah_number}
                          surahName={surahData && filterData?.surah_name}
                          surahAyats={surahData && filterData?.surah_ayats}
                          surahNameMean={filterData?.surahNameMean}
                          getFontSize={getFontSize}
                          getFontSizeArb={getArabicFontSize}
                          //bismillahShareef={props?.testData?.surahStoryHeading}
                          ayahNumber={surahData && filterData?.surah_number}
                      />
                      <Image
                          style={{width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2.5, top: -40, alignSelf:'center' }}
                          source={ASSETS.audio}
                      />
                    </View>
                      <NewAudioPlayer
                        ayatID={surahIndex}
                        increaseAyat={(index) => setNewSurah(index)}
                        decreaseAyat={() => setPreviousSurah()}     
                        ayatData={filterData}
                        surahName={filterData?.surahNameEng}
                      />
                  </View> 
                );
             }}
          />
        )}      
    </View>
  )
}

export default ListenQuran;