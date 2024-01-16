import React, { PureComponent, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBookmark,
  selectBookmarkWithId,
  deleteBookmark,
  addBookmark,
} from '../redux/bookmarkSlice';
import { useNavigation } from '@react-navigation/native';
import { selectFontSize, selectArabicFontSize } from '../redux/fontsSizeSlice';
import AudioPlayer from '../components/AudioPlayer';
import { SurahHeaderArabic, SurahTextArabic } from '../components/Arabic_comp';
import { QuranData } from '../components/QuranData';
import { COLOR } from '../assets';

const SurahwithTrans = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const filteredData = QuranData.find((item) => item?.surah_number === props?.route?.params?.surah);
  const data = props?.route?.params?.data ? props?.route?.params?.data : filteredData;
  const [id, setID] = useState();
  const flatListRef = useRef();
  const dispatch = useDispatch();
  const getFontSize = useSelector(selectFontSize);
  const getArabicFontSize = useSelector(selectArabicFontSize);
  const getBookmark = useSelector(selectBookmark);
  const allBookmarkID = getBookmark.map((e) => e.id);
  const [itemHeights, setItemHeights] = useState({});

  useEffect(() => {
    scrollToPosition(props?.route?.params?.bookMark);
  }, [flatListRef, Object.keys(itemHeights).length]);

  const findIndexByBookmarkID = (bookmarkID) => {
    if (bookmarkID) {
      return data?.groups.find((item) => {
        const itemBookmarkID =
          data?.surah_number + item?.group_no + data?.surah_number;
        return itemBookmarkID === bookmarkID;
      });
    }
    return -1;
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

  const scrollToPosition = async (id) => {
    const item = await findIndexByBookmarkID(id);
    if (item) {
      setLoading(false)
      flatListRef.current?.scrollToItem({ animated: true, item });
    }else{
      setLoading(false)
    }
  };

  const deleteThisBookmark = (id) => {
    if (id !== undefined) {
      dispatch(deleteBookmark({ id }));
    }
    console.log('Deleted-->>', id);
  };

  const handleBookmarkToggle = (bookmarkID) => {
    
    if (allBookmarkID.includes(bookmarkID)) {
      setID(bookmarkID);
      deleteThisBookmark(bookmarkID);
      showMessage({
        message: 'Bookmark Deleted',
        type: 'danger',
      });
    } else {
      showMessage({
        message: 'Bookmarked Successfully',
        type: 'success',
      });

      const item = data?.groups.find(
        (item) =>
          data?.surah_number + item?.group_no + data?.surah_number === bookmarkID
      );

      setID(bookmarkID);
      dispatch(
        addBookmark({
          id: bookmarkID,
          title: item?.title,
          surahNum: data?.surah_number,
          surahName: data?.surah_name,
          bookmarkArabic: item?.arabicText,
          bookmarkTranslation: item?.translation,
          surahNameEng: data?.surahNameEng,
          surahNameMean: data?.surahNameMean
        })
      );
    }
  };


  return (
    <>
      <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
        {loading === false
        ? (<FlatList
          data={data?.groups}
          ref={flatListRef}
          getItemLayout={(data, index) => ({
            length: calculateDynamicHeight(index),
            offset: calculateDynamicHeight(index) * index * 0.8,
            index,
          })}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <SurahHeaderArabic
              surahNumber={data?.surah_number}
              surahName={data?.surah_name}
              surahNameMean={data?.surahNameMean}
              surahAyats={data?.surah_ayats}
              bismillahShareef={data?.surahStoryHeading}
              bismillahShareefTrans={data?.surahStory}
              getFontSize={getFontSize}
              getFontSizeArb={getArabicFontSize}
            />
          )}
          renderItem={({ item, index }) => {
            const bookmarkID =
              data?.surah_number + item?.group_no + data?.surah_number;

            return (
              <View style={{ flex: 1, marginBottom: 10 }} key={index.toString()} onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setItemHeights((prevItemHeights) => ({
                  ...prevItemHeights,
                  [index]: height,
                }));
              }}>
                <TouchableOpacity
                  style={{ width: 40, alignSelf: 'flex-end' }}
                  onPress={() => handleBookmarkToggle(bookmarkID)}
                >
                  <Icon
                    name={
                      allBookmarkID?.includes(bookmarkID)
                        ? 'bookmark'
                        : 'bookmark-outline'
                    }
                    size={33}
                    color="orange"
                  />
                </TouchableOpacity>
                <View>
                  <SurahTextArabic
                    arabicText={item?.arabicText}
                    arbfontSize={getArabicFontSize}
                    transTitle={item?.title}
                    trans={item?.translation}
                    engFontSize={getFontSize}
                  />
                </View>
              </View>
            );
          }}
        />)
        : (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator loading={loading} size="large" color="#000" />
            <Text style={{color: '#000'}}>
              Fetching Data...
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
          style={{
            borderColor: COLOR.primary,
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            position: 'absolute',
            right: 20,
            height: 60,
            bottom: 50,
            backgroundColor: COLOR.primary,
            borderRadius: 100,
          }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('listenQuran', { name: data.surahNameEng, data: data, ayatsData: data, ayahNumber: data?.surah_number })
          }}>
          <MaterialCommunityIcons
            name="account-voice"
            size={28}
            color='#fff'
          />
      </TouchableOpacity>

      {/* <AudioPlayer
        qari1={data?.qari1}
        qari2={data?.qari2}
        qari3={data?.qari3}
        qari4={data?.qari4}
        surahName={data && data?.surahNameEng.slice(6)}
      /> */}
    </>
  );
};

export default SurahwithTrans;
