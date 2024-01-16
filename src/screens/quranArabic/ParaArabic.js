import {StyleSheet, Dimensions, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR } from '../../assets';

import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {showMessage} from 'react-native-flash-message';
import { selectFontSize, selectArabicFontSize } from '../../redux/fontsSizeSlice';
import { SurahHeaderArabic, SurahTextArabic,ParaTextArabic } from '../../components/Arabic_comp';
import API from '../../services/api'


const {width, height} = Dimensions.get('window');

const ParaArabic = props => {
  const data = props?.route?.params?.data;

  // console.log('index',props?.route?.params?.id)
  const navigation = useNavigation();
  const offsetRef = useRef(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false)
  const [para, setPara] = useState([]);
  const [newPara, setNewParah] = useState();
  const [oldPara, setOldParah] = useState();
  const [page, setPage] = useState(props?.route?.params?.id);
  const flatListRef = useRef();
  const getFontSize = useSelector(selectFontSize);
  const getArabicFontSize = useSelector(selectArabicFontSize);
  const [itemHeights, setItemHeights] = useState({});
  const [ previousOffset, setPoffset] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down'); // 'up', 'down', or 'none'
  const [firstParahEnd, setParaEnd] = useState(true)
  

  useEffect(() => {
    if(para.length==0){
        fetchData()
    }
  }, [!para.length]);

  const handleScroll = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    const contentHeight = nativeEvent.contentSize.height;
    const containerHeight = nativeEvent.layoutMeasurement.height;
    
    // console.log('y' + offsetY)

    if (offsetY > 0) {
      if (offsetY > offsetRef.current) {
        // Scrolling down
        setScrollDirection('down');
      } else if (offsetY < offsetRef.current) {
        // Scrolling up
          if(offsetY < previousOffset){
            //console.log('eedededed >>>>>>>>>>>>>>>>>>')
            setScrollDirection('');
            //setOldParah({arabic_name:"Roman", para_number: 1})
          } else {
            // console.log('else',previousOffset) 
            // console.log('current',offsetY) 
            
            setScrollDirection('up');
          }
      }
    }
    
    const paddingToBottom = 20;
    const isCloseToBottom = (Math.ceil(containerHeight + offsetY) >= contentHeight - paddingToBottom);
    
    if (isCloseToBottom && !loading && !loadingMore) {
      //console.log('sss',isCloseToBottom)
      if(firstParahEnd){        
          setParaEnd(false)
          setPoffset(offsetY)
          //console.log('end' + previousOffset)
      }
      offsetRef.current = offsetY;
      handleEndReached();
    }
  };

  const calculateDynamicHeight = (index) => {
    //console.log('get' + JSON.stringify(getBookmark[index]))
    if (itemHeights[index]) {
      return itemHeights[index] - 150;
    }
    // if (itemHeights[index]) {
    //   //console.log(getBookmark[index])
    //   return itemHeights[index] - 150;
    // }
    const defaultHeight = 150;
    return defaultHeight;
  };
  
  const handleEndReached = async () => {
    try {
      // You may want to use a loading indicator while fetching more data

      if (loadingMore || page >= props?.route?.params?.parahList.length - 1) {
        // console.log(page) 
        console.log(props?.route?.params?.parahList.length - 1)
        return
      }

        setLoadingMore(true);
        const nextPage = page + 1;
        const name = props?.route?.params?.parahList[nextPage]._id;
            
        // Fetch more data from the API
        API.doGetParahByid(name, responseJson => {
          console.log('get new para >>>' + JSON.stringify(responseJson.status))
            if(responseJson&&responseJson.status != 404){

              const updatedJsonObject = responseJson.message.map((message) => ({
                ...message,
                ayats: message.ayats.map((ayat, index) => {
                    if (index === 0 && ayat.starting_ayat === 1) {
                        // If ending_ayat is greater than surah_ayats, set surah to null
                        return { ...ayat, surah: message.surah };
                    }else if(ayat.ending_ayat < message.surah.surah_ayats){
                        return { ...ayat, surah: {} };  
                    } else {
                        // Otherwise, keep the ayat
                        return { ...ayat, surah: {} };
                    }
                }),
              }));

              let filterP = {}
              if(updatedJsonObject&&updatedJsonObject.length>0){
                  filterP = props?.route?.params?.parahList.find((item) => {
                    return updatedJsonObject[0].ayats[0].para === item._id  
                  })  
              }
              setPage(nextPage)
              setLoadingMore(false);
              if(firstParahEnd == false) {
                  setOldParah(newPara)  
              }
              setNewParah(filterP)
              // console.log('object' + JSON.stringify(filterP))
              setPara(prevPara => [...prevPara, ...updatedJsonObject]);
            } else {
              setLoadingMore(false);
              //setPara([]) 
              showMessage({
                  message: responseJson.message,
                  position: 'top',
                  type: "danger",
              });
            }
        });
      // }
    
    } catch (error) {
      // Handle error fetching more data
      console.error('Error fetching more data:', error);
    } finally {
      // Set loadingMore to false to indicate that loading has finished
      // setLoadingMore(false);
    }
  };
  
  const fetchData = async () => {
    try {

      API.doGetParahByid(data?._id, responseJson => {
        // console.log('get old parah >>>' + JSON.stringify(responseJson.status))
          if(responseJson&&responseJson.status != 404){

          const updatedJsonObject = responseJson.message.map((message) => ({
            ...message,
            ayats: message.ayats.map((ayat, index) => {
                if (index === 0 && ayat.starting_ayat === 1) {
                    // If ending_ayat is greater than surah_ayats, set surah to null
                    return { ...ayat, surah: message.surah };
                }else if(ayat.ending_ayat < message.surah.surah_ayats){
                    return { ...ayat, surah: {} };  
                } else {
                    // Otherwise, keep the ayat
                    return { ...ayat, surah: {} };
                }
            }),
          }));

            setLoading(false)
            setPara(updatedJsonObject) 
          } else {
            setLoading(false)
            setPara([]) 
            showMessage({
                message: responseJson.message,
                position: 'top',
                type: "danger",
            });
          }
      });   

    } catch (e) {
      setLoading(false)
      // Handle error reading value
    }
  }

  
  return (
    <>
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeModalBtn}>
          <FontAwesome5 name="arrow-left" size={16} color="#fff" />
        </TouchableOpacity>
        <View style={{flex:1,alignItems: 'center'}}>
          {scrollDirection === "down" && newPara ? (
            <Text style={styles.heading}>
              {newPara?.arabic_name + ' ' + newPara?.para_number}
            </Text>
          ) : scrollDirection === "up" && oldPara ? (
            <Text style={styles.heading}>
              {oldPara?.arabic_name + ' ' + oldPara?.para_number}
            </Text>
          ) : (
            <Text style={styles.heading}>
              {props?.route?.params?.data?.arabic_name + ' ' + props?.route?.params?.data?.para_number}
            </Text>
          )}
        </View>
      </View>
      <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
        
        {loading == false
        ? (
          <>
          
          
        <FlatList
          data={para}
          ref={flatListRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          // getItemLayout={(data, index) => ({
          //   length: calculateDynamicHeight(index),
          //   offset: calculateDynamicHeight(index) * index * 0.8,
          //   index,
          // })}
          // onEndReached={() => handleEndReached()}
          onEndReachedThreshold={0.5} // Adjust this threshold as needed
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            // You can customize the loading indicator here
            loadingMore && <View><ActivityIndicator size="large" color="#000" /></View>
          )}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flex: 1, marginBottom: 10 }} key={index.toString()} onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setItemHeights((prevItemHeights) => ({
                  ...prevItemHeights,
                  [index]: height,
                }));
              }}>
              <View>
                {item.ayats.map((element,index) => ( 
                  <ParaTextArabic
                    surah={element?.surah} 
                    arabicText={element?.ayat}
                    arbfontSize={getArabicFontSize}
                    // transTitle={element?.title}
                    //trans={item?.translation}
                    engFontSize={getFontSize}
                    getFontSize={getFontSize}
                    getFontSizeArb={getArabicFontSize}
                  />
                ))}
                </View>
              </View>
            );
          }}
        /></>)
        : (
          <View style={{flex: 1, alignItems: 'center'}}>
            <ActivityIndicator loading={loading} size="large" color="#000" />
          </View>
        )}
      </View>
    </>
  );
};

export default ParaArabic;


const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.navyBlue,
    height: '8%',
    width: Dimensions.get('window').width
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  colorText: {
    color: COLOR.yellow,
  },
  closeModalBtn: {
    left: 15,
    justifyContent:'center',
    alignItems: 'flex-start',
  },
});
